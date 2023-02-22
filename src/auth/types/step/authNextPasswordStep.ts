import { AdditionalInfo, AuthCodeDeliveryDetails, AuthUserAttributeKey } from "../models";
import { AuthResetPasswordStep } from "./AuthResetPasswordStep";

export type AuthNextResetPasswordStep<
  UserAttributeKey extends AuthUserAttributeKey
> = {
  resetPasswordStep: AuthResetPasswordStep;
  additionalInfo: AdditionalInfo;
  codeDeliveryDetails: AuthCodeDeliveryDetails<UserAttributeKey>;
};


