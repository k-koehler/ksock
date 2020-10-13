export interface ChannelParams {
  id: string;
  transform?: (s: string) => string;
}

export default class Channel {
  private id!: string;
  private transform!: (s: string) => string;

  public constructor(params: ChannelParams) {
    params.transform ||= (s: string) => Buffer.from(s).toString("base64");
    Object.assign(this, params);
  }

  public get name() {
    return this.transform(this.id);
  }
}
