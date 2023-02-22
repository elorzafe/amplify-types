import { AuthUserAttribute } from "../models/authUserAttribute";
import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthServiceOptions } from "../options/authServiceOptions";


export type UpdateUserAttributeRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  options?: { serviceOptions?: ServiceOptions };
} & AuthUserAttribute<UserAttributeKey>;

