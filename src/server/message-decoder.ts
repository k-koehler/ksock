import Command from "./command/command";

export default class MessageDecoder {
  private message: string;

  public constructor(message: string) {
    this.message = message;
  }

  public decode(): Command {
    return {} as any;
  }
}
