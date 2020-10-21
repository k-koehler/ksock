import Command, { CommandType } from "./command";

export default class ByeCommand extends Command {
  public type = CommandType.Bye;
}
