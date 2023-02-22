import { AdditionalInfo, AuthCodeDeliveryDetails, AuthUserAttributeKey } from "../models";
import { AuthUpdateAttributeStep } from "./authUpdateAttributeStep";

export type AuthNextUpdateAttributeStep<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  updateAttributeStep: AuthUpdateAttributeStep;
  additionalInfo: AdditionalInfo;
  codeDeliveryDetails: AuthCodeDeliveryDetails<UserAttributeKey>;
};