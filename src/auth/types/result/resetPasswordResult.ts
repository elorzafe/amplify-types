import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthNextResetPasswordStep } from "../step/AuthNextPasswordStep";

export type ResetPasswordResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  isPasswordReset: boolean;
  nextStep: AuthNextResetPasswordStep<UserAttributeKey>;
};

