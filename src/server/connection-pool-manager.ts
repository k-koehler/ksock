import Client from "./client";
import Command, { CommandType } from "./command/command";
import SubscribeCommand from "./command/subscribe.command";
import ConnectionPool from "./connection-pool";
import MessageDecoder from "./message-decoder";
import { sleep } from "./utils";

export const TICK_INTERVAL_MS = 20;
export const CLIENT_RENEW_INTERVAL_MS = 30_000;

export default class ConnectionPoolManager {
  private connectionPool: ConnectionPool;

  public constructor(connectionPool: ConnectionPool) {
    this.connectionPool = connectionPool;
  }

  private handleKeepAlive(client: Client) {
    client.lastRenewed = Date.now();
  }

  private handleTerminate(client: Client) {
    client.terminate();
    this.connectionPool.removeConnection(client.id);
  }

  private handleSubscribe(command: SubscribeCommand, client: Client){
    
  }

  private handleCommand(command: Command, client: Client) {
    switch (command.type) {
      case CommandType.KeepAlive:
        return this.handleKeepAlive(client);
      case CommandType.Bye:
        return this.handleTerminate(client);
      case CommandType.Subscribe
    }
  }

  private async tick() {
    for (const client of this.connectionPool.clients.values()) {
      const message = client.messages.dequeue();
      if (message) {
        const messageDecoder = new MessageDecoder(message);
        this.handleCommand(messageDecoder.decode(), client);
      } else if (client.lastRenewed < Date.now() - CLIENT_RENEW_INTERVAL_MS) {
        this.handleTerminate(client);
      }
    }
  }

  public async manage() {
    while (true) {
      const start = Date.now();
      await this.tick();
      const end = Date.now();
      const took = end - start;
      if (took < TICK_INTERVAL_MS) {
        await sleep(TICK_INTERVAL_MS - took);
      }
    }
  }
}
