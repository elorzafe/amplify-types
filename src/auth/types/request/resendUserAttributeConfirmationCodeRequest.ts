import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthServiceOptions } from "../options/authServiceOptions";

export type ResendUserAttributeConfirmationCodeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  userAttributeKey: UserAttributeKey;
  options?: { serviceOptions?: ServiceOptions };
};
