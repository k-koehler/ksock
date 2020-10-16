import Channel from "../channel";
import { ProtocolIntermediate } from "./common";

export interface SubscriptionParams {
  channel?: Channel;
  topic: string;
}

export default class Subscription implements ProtocolIntermediate {
  private topic!: string;
  private channel?: Channel;

  public constructor(params: SubscriptionParams) {
    Object.assign(this, params);
  }

  public protocolMessage() {
    return `SUBSCRIBE ${this.topic}${
      this.channel ? `:${this.channel.name}` : ""
    })`;
  }
}
