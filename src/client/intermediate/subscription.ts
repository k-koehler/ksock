import Channel from "../channel";
import { ProtocolIntermediate } from "./common";

export interface SubscriptionParams {
  channel?: Channel;
  topic: string;
  callback: (data: any) => void;
}

export default class Subscription implements ProtocolIntermediate {
  private topic!: string;
  private channel?: Channel;
  public callback!: (data: any) => void;

  public constructor(params: SubscriptionParams) {
    Object.assign(this, params);
  }

  public protocolMessage() {
    return `SUBSCRIBE ${this.topic}${
      this.channel ? `:${this.channel.name}` : ""
    })`;
  }
}
