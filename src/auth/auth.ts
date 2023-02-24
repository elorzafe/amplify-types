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
  AuthStandardAtributeKey,
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
): Promise<AuthSignUpResult<AuthStandardAtributeKey | CustomAttribute>>;

declare function confirmSignUp(
  req: ConfirmSignUpRequest<CognitoConfirmSignUpOptions>
): Promise<AuthSignUpResult<AuthStandardAtributeKey | CustomAttribute>>;

declare function resendSignUpCode(
  req: ResendSignUpCodeRequest<CognitoResendSignUpCodeOptions>
): Promise<AuthCodeDeliveryDetails<AuthStandardAtributeKey | CustomAttribute>>;

declare function signIn(
  req: SignInRequest<CognitoSignInOptions>
): Promise<AuthSignInResult<AuthStandardAtributeKey | CustomAttribute>>;

declare function confirmSignIn<NextSignInStep extends AuthSignInStep>(
  req: ConfirmSignInRequest<
    CognitoMFAType,
    CognitoConfirmSignInOptions
  >[NextSignInStep]
): Promise<AuthSignInResult<AuthStandardAtributeKey | CustomAttribute>>;

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
): Promise<AuthUserAttribute<AuthStandardAtributeKey | CustomAttribute>[]>;

declare function updateUserAttributes(
  req: UpdateUserAttributesRequest<
    AuthStandardAtributeKey | CustomAttribute,
    CognitoUpdateUserAttributesOptions
  >
): Promise<
  UpdateUserAttributesResult<AuthStandardAtributeKey | CustomAttribute>
>;

declare function updateUserAttribute(
  req: UpdateUserAttributeRequest<
    AuthStandardAtributeKey | CustomAttribute,
    CognitoUpdateUserAttributeOptions
  >
): Promise<
  UpdateUserAttributeResult<AuthStandardAtributeKey | CustomAttribute>
>;

declare function confirmUserAttribute(
  req: ConfirmUserAttributeRequest<AuthStandardAtributeKey | CustomAttribute>
): Promise<void>;

declare function resendUserAttributeConfirmationCode(
  req: ResendUserAttributeConfirmationCodeRequest<
    AuthStandardAtributeKey | CustomAttribute,
    CognitoResendUserAttributeConfirmationCodeOptions
  >
): Promise<AuthCodeDeliveryDetails<AuthStandardAtributeKey | CustomAttribute>>;

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
): Promise<ResetPasswordResult<AuthStandardAtributeKey | CustomAttribute>>;

declare function confirmResetPassword(
  req: ConfirmResetPasswordRequest
): Promise<void>;

declare function signOut(req?: SignOutRequest): Promise<SignOutResult>;
