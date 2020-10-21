import Command, { CommandType } from "./command";

export default class KeepAliveCommand extends Command {
  public type = CommandType.KeepAlive;
}
