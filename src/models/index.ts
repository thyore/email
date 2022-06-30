import { Models } from "@rematch/core";
import { Mail } from "./mail";
export interface RootModel extends Models<RootModel> {
  Mail: typeof Mail;
}
export const models: RootModel = { Mail };