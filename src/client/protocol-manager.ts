import Sock from "../lib/sock";
import Emission from "./intermediate/emission";
import Subscription from "./intermediate/subscription";

export default class ProtocolManager {
  private sock: Sock;

  public constructor(sock: Sock) {
    this.sock = sock;
  }

  public async hello() {
    await this.sock.sendRaw("HELLO");
  }

  public async keepAlive() {
    await this.sock.sendRaw("KEEP_ALIVE");
  }

  public async subscribe(subscription: Subscription) {
    await this.sock.sendRaw(subscription.protocolMessage());
  }

  public async emit(emission: Emission) {
    await this.sock.sendRaw(emission.protocolMessage());
  }

  public async bye() {
    await this.sock.sendRaw("BYE");
  }
}
