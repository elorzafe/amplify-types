import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthServiceOptions } from "../options/authServiceOptions";
import { AuthSignUpOptions } from "../options/authSignUpOptions";

export type SignUpRequest<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey ,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  password: string;
  userId?: string;
  options?: AuthSignUpOptions<UserAttributeKey, ServiceOptions>;
};
