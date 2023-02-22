import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthNextSignInStep } from "../step/AuthNextSignInStep";

export type AuthSignInResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  isSignedIn: boolean;
  nextStep: AuthNextSignInStep<UserAttributeKey>;
};
