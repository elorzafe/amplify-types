import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { UpdateUserAttributeResult } from "./updateUserAttributeResult";

export type UpdateUserAttributesResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  [authKey: string]: UpdateUserAttributeResult<UserAttributeKey>;
};
