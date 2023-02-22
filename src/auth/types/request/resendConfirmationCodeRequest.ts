import { AuthUserAttributeKey } from "../models/authUserAttributeKey";

export type ResendConfirmationCodeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  attributeName: UserAttributeKey;
};
