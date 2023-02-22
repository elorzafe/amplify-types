import { AuthServiceOptions } from "../options/authServiceOptions";
import { AuthSignInStep } from "../step/authSignInStep";
import { AuthMFAType } from "./setPreferredMfaRequest";

// AuthSignInStep.CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE
export type SoftwareTokenChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  code: string;
  options?: { serviceOptions?: ServiceOptions };
};

// AuthSignInStep.CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE
export type CustomChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  challengeResponse: string;
  options?: { serviceOptions?: ServiceOptions };
};

// AuthSignInStep.CONFIRM_SIGN_IN_SMS_MFA_CODE
export type SMSChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  smsCode: string;
  options?: { serviceOptions?: ServiceOptions };
};

// AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
export type NewPasswordRequiredChallengeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  newPassword: string;
  options?: { serviceOptions?: ServiceOptions };
};

// AuthSignInStep.SELECT_MFA_TYPE
export type SelectMFAChallengeRequest<
  MFAType extends AuthMFAType = AuthMFAType,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  mfaType: MFAType;
  options?: { serviceOptions?: ServiceOptions };
};

export type DefaultConfirmSignInRequest<
  MFAType extends AuthMFAType = AuthMFAType,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> =
  | SoftwareTokenChallengeRequest<ServiceOptions>
  | CustomChallengeRequest<ServiceOptions>
  | SMSChallengeRequest<ServiceOptions>
  | NewPasswordRequiredChallengeRequest<ServiceOptions>
  | SelectMFAChallengeRequest<MFAType, ServiceOptions>;

export type ConfirmSignInRequest<
  MFAType extends AuthMFAType = AuthMFAType,
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE]: SoftwareTokenChallengeRequest<ServiceOptions>;
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE]: CustomChallengeRequest<ServiceOptions>;
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE]: SMSChallengeRequest<ServiceOptions>;
  [AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED]: NewPasswordRequiredChallengeRequest<ServiceOptions>;
  [AuthSignInStep.SELECT_MFA_TYPE]: SelectMFAChallengeRequest<
    MFAType,
    ServiceOptions
  >;
  [defaultStep: string]: DefaultConfirmSignInRequest<MFAType, ServiceOptions>;
};
