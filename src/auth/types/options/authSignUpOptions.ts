import { AuthUserAttribute } from "../models/authUserAttribute";
import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthServiceOptions } from "./authServiceOptions";


export type AuthSignUpOptions<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  userAttributes: AuthUserAttribute<UserAttributeKey>[];
  serviceOptions?: ServiceOptions;
};
