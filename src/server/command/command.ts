export enum CommandType {
  Hello = "HELLO",
  KeepAlive = "KEEP_ALIVE",
  Emit = "EMIT",
  Subscribe = "SUBSCRIBE",
  Bye = "BYE",
}

export default abstract class Command {
  public abstract type: CommandType;
}
