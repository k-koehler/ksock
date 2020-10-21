import Sock from "./sock";
import Channel from "./channel";
import Emission from "./intermediate/emission";
import Subscription from "./intermediate/subscription";
import ProtocolManager from "./protocol-manager";

export default class Event {
  private url: string;
  private protocolManager?: ProtocolManager;
  private hasInitialized = false;
  private topic: string;

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

  public constructor(url: string, topic: string) {
    this.url = url;
    this.topic = topic;
  }

  public async subscribe(cb: (data: any) => void): Promise<void>;
  public async subscribe(
    channel: Channel,
    cb: (data: any) => void
  ): Promise<void>;
  public async subscribe(
    channelOrCb: ((data: any) => void) | Channel,
    cb?: (data: any) => void
  ) {
    const topic = this.topic;
    const channel = channelOrCb instanceof Channel ? channelOrCb : undefined;
    const callback = (channelOrCb instanceof Function ? channelOrCb : cb)!;
    (await this.useProtocolManager()).subscribe(
      new Subscription({ topic, channel, callback })
    );
  }

  public async emit(channel?: Channel) {
    const topic = this.topic;
    return (await this.useProtocolManager()).emit(
      new Emission({ topic, channel })
    );
  }
}
