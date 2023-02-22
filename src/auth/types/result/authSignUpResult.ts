import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthNextSignUpStep } from "../step/authNextSignUpStep";

export type AuthSignUpResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  isSignUpComplete: boolean;
  nextStep: AuthNextSignUpStep<UserAttributeKey>;
};
