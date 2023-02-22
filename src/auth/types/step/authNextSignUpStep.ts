import { AdditionalInfo } from "../models";
import { AuthCodeDeliveryDetails } from "../models/authCodeDeliveryDetails";
import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthSignUpStep } from "./AuthSignUpStep";



export type AuthNextSignUpStep<UserAttributeKey extends AuthUserAttributeKey> =
  {
    signUpStep?: AuthSignUpStep;
    additionalInfo?: AdditionalInfo;
    codeDeliveryDetails?: AuthCodeDeliveryDetails<UserAttributeKey>;
  };

