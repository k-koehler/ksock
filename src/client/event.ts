import Sock from "../lib/sock";
import Channel from "./channel";
import Emission from "./intermediate/emission";
import Subscription from "./intermediate/subscription";
import ProtocolManager from "./protocol-manager";

export default class Event {
  private url: string;
  private protocolManager?: ProtocolManager;
  private hasInitialized = false;

  private async useProtocolManager() {
    this.protocolManager ||= new ProtocolManager(
      await new Sock(this.url).wait()
    );
    await this.init();
    return this.protocolManager;
  }

  private async init() {
    if (!this.protocolManager) {
      throw new Error("protocol manager not intitialized");
    }
    if (this.hasInitialized) {
      return;
    }
    await this.protocolManager.hello();
    const keepAlive = setInterval(async () => {
      if (!this.protocolManager) {
        clearInterval(keepAlive);
      }
      await this.protocolManager?.keepAlive();
    }, 10000);
    this.hasInitialized = true;
  }

  public constructor(url: string) {
    this.url = url;
  }

  public async subscribe(topic: string, channel?: Channel) {
    (await this.useProtocolManager()).subscribe(
      new Subscription({ topic, channel })
    );
  }

  public async emit(topic: string, channel?: Channel) {
    return (await this.useProtocolManager()).emit(
      new Emission({ topic, channel })
    );
  }
}
