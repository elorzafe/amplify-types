import { AuthUserAttributeKey } from "../models/authUserAttributeKey";

export type ConfirmUserAttributeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  userAttributeKey: UserAttributeKey;
  confirmationCode: string;
};
