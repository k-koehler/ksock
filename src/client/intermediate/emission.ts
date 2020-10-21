import Channel from "../channel";
import { ProtocolIntermediate } from "./common";

export interface EmissionParams {
  channel?: Channel;
  topic: string;
}

export default class Emission implements ProtocolIntermediate {
  private topic!: string;
  private channel?: Channel;

  public constructor(params: EmissionParams) {
    Object.assign(this, params);
  }

  public protocolMessage(): string {
    return `EMIT ${this.topic}${this.channel ? `:${this.channel.name}` : ""}`;
  }
}
