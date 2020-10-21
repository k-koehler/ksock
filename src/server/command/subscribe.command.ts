import Subscription from "../../client/intermediate/subscription";
import Command, { CommandType } from "./command";

export default class SubscribeCommand extends Command {
  public type = CommandType.Subscribe;
  public subscription: Subscription;

  public constructor(subscription: Subscription) {
    super();
    this.subscription = subscription;
  }
}
