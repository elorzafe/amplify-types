import {
  CognitoMFAType,
  CognitoUserAttributeKey,
  CustomAttribute,
} from "./cognito/types/models";
import {
  CognitoConfirmSignInOptions,
  CognitoConfirmSignUpOptions,
  CognitoResendSignUpCodeOptions,
  CognitoResendUserAttributeConfirmationCodeOptions,
  CognitoResetPasswordOptions,
  CognitoSignInOptions,
  CognitoSignInWithWebUIOptions,
  CognitoSignUpOptions,
  CognitoUpdateUserAttributeOptions,
  CognitoUpdateUserAttributesOptions,
} from "./cognito/types/options";
import {
  AuthCodeDeliveryDetails,
  AuthDevice,
  AuthSession,
  AuthStandardAttributeKey,
  AuthUserAttribute,
} from "./types/models";
import {
  ConfirmResetPasswordRequest,
  ConfirmSignInRequest,
  ConfirmSignUpRequest,
  ConfirmSoftwareTokenRequest,
  ConfirmUserAttributeRequest,
  FetchAuthSessionRequest,
  FetchUserAttributesRequest,
  ForgetDeviceRequest,
  GetCurrentUserRequest,
  ResendSignUpCodeRequest,
  ResendUserAttributeConfirmationCodeRequest,
  ResetPasswordRequest,
  SetPreferredMFARequest,
  SignInRequest,
  SignInWithWebUIRequest,
  SignOutRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateUserAttributeRequest,
  UpdateUserAttributesRequest,
} from "./types/request";
import {
  AuthSignInResult,
  AuthSignUpResult,
  AuthUser,
  ResetPasswordResult,
  SetupSoftwareTokenResult,
  SignOutResult,
  UpdateUserAttributeResult,
  UpdateUserAttributesResult,
} from "./types/result";
import { AuthSignInStep } from "./types/step";

declare function signUp(
  req: SignUpRequest<CognitoUserAttributeKey, CognitoSignUpOptions>
): Promise<AuthSignUpResult<AuthStandardAttributeKey | CustomAttribute>>;

declare function confirmSignUp(
  req: ConfirmSignUpRequest<CognitoConfirmSignUpOptions>
): Promise<AuthSignUpResult<AuthStandardAttributeKey | CustomAttribute>>;

declare function resendSignUpCode(
  req: ResendSignUpCodeRequest<CognitoResendSignUpCodeOptions>
): Promise<AuthCodeDeliveryDetails<AuthStandardAttributeKey | CustomAttribute>>;

declare function signIn(
  req: SignInRequest<CognitoSignInOptions>
): Promise<AuthSignInResult<AuthStandardAttributeKey | CustomAttribute>>;

declare function confirmSignIn<NextSignInStep extends AuthSignInStep>(
  req: ConfirmSignInRequest<
    CognitoMFAType,
    CognitoConfirmSignInOptions
  >[NextSignInStep]
): Promise<AuthSignInResult<AuthStandardAttributeKey | CustomAttribute>>;

declare function signInWithWebUI(
  req: SignInWithWebUIRequest<CognitoSignInWithWebUIOptions>
): Promise<AuthSignInResult>;

declare function fetchAuthSession(
  req?: FetchAuthSessionRequest
): Promise<AuthSession>;

declare function rememberDevice(): Promise<void>;

declare function forgetDevice(
  req?: ForgetDeviceRequest | undefined
): Promise<void>;

declare function fetchDevices(): Promise<AuthDevice[]>;

namespace TOTP {
  export declare function setup(): Promise<SetupSoftwareTokenResult>;
  export declare function confirmSoftwareToken(
    req: ConfirmSoftwareTokenRequest
  ): Promise<void>;
}

declare function fetchUserAttributes(
  req?: FetchUserAttributesRequest | undefined
): Promise<AuthUserAttribute<AuthStandardAttributeKey | CustomAttribute>[]>;

declare function updateUserAttributes(
  req: UpdateUserAttributesRequest<
    AuthStandardAttributeKey | CustomAttribute,
    CognitoUpdateUserAttributesOptions
  >
): Promise<
  UpdateUserAttributesResult<AuthStandardAttributeKey | CustomAttribute>
>;

declare function updateUserAttribute(
  req: UpdateUserAttributeRequest<
    AuthStandardAttributeKey | CustomAttribute,
    CognitoUpdateUserAttributeOptions
  >
): Promise<
  UpdateUserAttributeResult<AuthStandardAttributeKey | CustomAttribute>
>;

declare function confirmUserAttribute(
  req: ConfirmUserAttributeRequest<AuthStandardAttributeKey | CustomAttribute>
): Promise<void>;

declare function resendUserAttributeConfirmationCode(
  req: ResendUserAttributeConfirmationCodeRequest<
    AuthStandardAttributeKey | CustomAttribute,
    CognitoResendUserAttributeConfirmationCodeOptions
  >
): Promise<AuthCodeDeliveryDetails<AuthStandardAttributeKey | CustomAttribute>>;

declare function deleteUser(): Promise<void>;

declare function getCurrentUser(
  req?: GetCurrentUserRequest | undefined
): Promise<AuthUser>;

declare function setPreferredMFA(
  req: SetPreferredMFARequest<CognitoMFAType>
): Promise<void>;

declare function updatePassword(req: UpdatePasswordRequest): Promise<void>;

declare function resetPassword(
  req: ResetPasswordRequest<CognitoResetPasswordOptions>
): Promise<ResetPasswordResult<AuthStandardAttributeKey | CustomAttribute>>;

declare function confirmResetPassword(
  req: ConfirmResetPasswordRequest
): Promise<void>;

declare function signOut(req?: SignOutRequest): Promise<SignOutResult>;
