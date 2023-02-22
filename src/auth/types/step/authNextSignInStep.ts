import { AdditionalInfo } from "../models";
import { AuthCodeDeliveryDetails } from "../models/authCodeDeliveryDetails";
import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthSignInStep } from "./authSignInStep";

export type AuthNextSignInStep<UserAttributeKey extends AuthUserAttributeKey> = {
    signInStep: AuthSignInStep;
    codeDeliveryDetails?: AuthCodeDeliveryDetails;
    additionalInfo?: AdditionalInfo;
    confirmationCode?: string;
    missingAttributes?: UserAttributeKey[]
  };