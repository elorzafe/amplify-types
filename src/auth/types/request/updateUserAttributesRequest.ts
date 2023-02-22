import { AuthUserAttribute } from "../models/authUserAttribute";
import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthServiceOptions } from "../options/authServiceOptions";

export type UpdateUserAttributesRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  userAttributes: AuthUserAttribute<UserAttributeKey>[];
  options?: { serviceOptions?: ServiceOptions };
};

