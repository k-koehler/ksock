import Sock from "../lib/sock";

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

  public subscribe() {}

  public emit() {}

  public async bye() {
    await this.sock.sendRaw("BYE");
  }
}
