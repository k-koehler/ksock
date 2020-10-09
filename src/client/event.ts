import Sock from "../lib/sock";
import ProtocolManager from "./protocol-manager";

export default class Event {
  private url: string;
  private protocolManager?: ProtocolManager;

  public constructor(url: string) {
    this.url = url;
  }

  public async useProtocolManager() {
    return (
      this.protocolManager ||
      new ProtocolManager(await new Sock(this.url).wait())
    );
  }
}
