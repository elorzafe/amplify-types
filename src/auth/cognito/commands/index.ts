import { AuthDevice } from "../../types/authDevice";
import { AuthSession } from "../../types/authSession";
import {
  AuthCodeDeliveryDetails,
  AuthStandardAtrributeKey,
  AuthUserAttribute,
} from "../../types/models";
import {
  ConfirmResetPasswordRequest,
  ConfirmSignInRequest,
  ConfirmSignUpRequest,
  ConfirmSoftwareTokenRequest,
  ConfirmUserAttributeRequest,
  FetchAuthSessionRequest,
  FetchUserAttributesRequest,
  ForgetDeviceRequest,
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
} from "../../types/request";
import { GetCurrentUserRequest } from "../../types/request/getCurrentUserRequest";
import {
  AuthSignInResult,
  AuthSignUpResult,
  AuthUser,
  ResetPasswordResult,
  SetupSoftwareTokenResult,
  SignOutResult,
  UpdateUserAttributesResult,
} from "../../types/result";
import { UpdateUserAttributeResult } from "../../types/result/updateUserAttributeResult";
import { AuthSignInStep } from "../../types/step";
import { CognitoUserAttributeKey, CustomAttribute } from "../types/models";
import { CognitoMFAType } from "../types/models/cognitoMfaType";
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
} from "../types/options";
import { TOTPNamespace } from "../types/totpNameSpace";

declare function signUp(
  req: SignUpRequest<CognitoUserAttributeKey, CognitoSignUpOptions>
): Promise<AuthSignUpResult<AuthStandardAtrributeKey | CustomAttribute>>;

declare function confirmSignUp(
  req: ConfirmSignUpRequest<CognitoConfirmSignUpOptions>
): Promise<AuthSignUpResult<AuthStandardAtrributeKey | CustomAttribute>>;

declare function resendSignUpCode(
  req: ResendSignUpCodeRequest<CognitoResendSignUpCodeOptions>
): Promise<AuthCodeDeliveryDetails<AuthStandardAtrributeKey | CustomAttribute>>;

declare function signIn(
  req: SignInRequest<CognitoSignInOptions>
): Promise<AuthSignInResult<AuthStandardAtrributeKey | CustomAttribute>>;

declare function confirmSignIn<NextSignInStep extends AuthSignInStep>(
  req: ConfirmSignInRequest<
    CognitoMFAType,
    CognitoConfirmSignInOptions
  >[NextSignInStep]
): Promise<AuthSignInResult<AuthStandardAtrributeKey | CustomAttribute>>;

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

const TOTP: TOTPNamespace = {
  setup: function (): Promise<SetupSoftwareTokenResult> {
    throw new Error("Function not implemented.");
  },
  confirmSoftwareToken: function (
    req: ConfirmSoftwareTokenRequest
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  authenticatorLink: function (appName: String, secretCode: string): string {
    throw new Error("Function not implemented.");
  },
};

declare function fetchUserAttributes(
  req?: FetchUserAttributesRequest | undefined
): Promise<AuthUserAttribute<AuthStandardAtrributeKey | CustomAttribute>[]>;

declare function updateUserAttributes(
  req: UpdateUserAttributesRequest<
    AuthStandardAtrributeKey | CustomAttribute,
    CognitoUpdateUserAttributesOptions
  >
): Promise<
  UpdateUserAttributesResult<AuthStandardAtrributeKey | CustomAttribute>
>;

declare function updateUserAttribute(
  req: UpdateUserAttributeRequest<
    AuthStandardAtrributeKey | CustomAttribute,
    CognitoUpdateUserAttributeOptions
  >
): Promise<
  UpdateUserAttributeResult<AuthStandardAtrributeKey | CustomAttribute>
>;

declare function confirmUserAttribute(
  req: ConfirmUserAttributeRequest<AuthStandardAtrributeKey | CustomAttribute>
): Promise<void>;

declare function resendUserAttributeConfirmationCode(
  req: ResendUserAttributeConfirmationCodeRequest<
    AuthStandardAtrributeKey | CustomAttribute,
    CognitoResendUserAttributeConfirmationCodeOptions
  >
): Promise<AuthCodeDeliveryDetails<AuthStandardAtrributeKey | CustomAttribute>>;

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
): Promise<ResetPasswordResult<AuthStandardAtrributeKey | CustomAttribute>>;

declare function confirmResetPassword(
  req: ConfirmResetPasswordRequest
): Promise<void>;

declare function signOut(
  req?: SignOutRequest | undefined
): Promise<SignOutResult>;
