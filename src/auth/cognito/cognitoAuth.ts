import { AuthInterface } from "../auth";
import { AuthDevice } from "../types/authDevice";
import { AuthSession } from "../types/authSession";
import {
  AuthCodeDeliveryDetails,
  AuthStandardAtrributeKey,
  AuthUserAttribute,
} from "../types/models";
import {
  SignUpRequest,
  ConfirmSignUpRequest,
  ResendSignUpCodeRequest,
  SignInRequest,
  ConfirmSignInRequest,
  SignInWithWebUIRequest,
  FetchAuthSessionRequest,
  ForgetDeviceRequest,
  FetchUserAttributesRequest,
  UpdateUserAttributesRequest,
  UpdateUserAttributeRequest,
  ConfirmUserAttributeRequest,
  ResendUserAttributeConfirmationCodeRequest,
  SetPreferredMFARequest,
  UpdatePasswordRequest,
  ResetPasswordRequest,
  ConfirmResetPasswordRequest,
  SignOutRequest,
  ConfirmSoftwareTokenRequest,
} from "../types/request";
import { GetCurrentUserRequest } from "../types/request/getCurrentUserRequest";
import {
  AuthSignUpResult,
  AuthSignInResult,
  UpdateUserAttributesResult,
  AuthUser,
  ResetPasswordResult,
  SignOutResult,
  SetupSoftwareTokenResult,
} from "../types/result";
import { UpdateUserAttributeResult } from "../types/result/updateUserAttributeResult";
import { AuthSignInStep } from "../types/step";
import { CognitoUserAttributeKey, CustomAttribute } from "./types/models";
import { CognitoMFAType } from "./types/models/cognitoMfaType";
import {
  CognitoConfirmSignUpOptions,
  CognitoSignUpOptions,
  CognitoResendSignUpCodeOptions,
  CognitoSignInOptions,
  CognitoConfirmSignInOptions,
  CognitoSignInWithWebUIOptions,
  CognitoUpdateUserAttributesOptions,
  CognitoUpdateUserAttributeOptions,
  CognitoResendUserAttributeConfirmationCodeOptions,
  CognitoResetPasswordOptions,
} from "./types/options";
import { TOTPNamespace } from "./types/totpNameSpace";

export class AuthClass implements AuthInterface {
  signUp(
    req: SignUpRequest<CognitoUserAttributeKey, CognitoSignUpOptions>
  ): Promise<AuthSignUpResult<AuthStandardAtrributeKey | CustomAttribute>> {
    throw new Error("Method not implemented.");
  }
  confirmSignUp(
    req: ConfirmSignUpRequest<CognitoConfirmSignUpOptions>
  ): Promise<AuthSignUpResult<AuthStandardAtrributeKey | CustomAttribute>> {
    throw new Error("Method not implemented.");
  }
  resendSignUpCode(
    req: ResendSignUpCodeRequest<CognitoResendSignUpCodeOptions>
  ): Promise<
    AuthCodeDeliveryDetails<AuthStandardAtrributeKey | CustomAttribute>
  > {
    throw new Error("Method not implemented.");
  }
  signIn(
    req: SignInRequest<CognitoSignInOptions>
  ): Promise<AuthSignInResult<AuthStandardAtrributeKey | CustomAttribute>> {
    throw new Error("Method not implemented.");
  }
  confirmSignIn<
    NextSignInStep extends
      | AuthSignInStep.CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE
      | AuthSignInStep.CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE
      | AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
      | AuthSignInStep.CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE
      | AuthSignInStep.SELECT_MFA_TYPE
  >(
    req: ConfirmSignInRequest<
      CognitoMFAType,
      CognitoConfirmSignInOptions
    >[NextSignInStep]
  ): Promise<AuthSignInResult<AuthStandardAtrributeKey | CustomAttribute>> {
    throw new Error("Method not implemented.");
  }
  signInWithWebUI(
    req: SignInWithWebUIRequest<CognitoSignInWithWebUIOptions>
  ): Promise<AuthSignInResult> {
    throw new Error("Method not implemented.");
  }
  fetchAuthSession(req?: FetchAuthSessionRequest): Promise<AuthSession> {
    throw new Error("Method not implemented.");
  }
  rememberDevice(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  forgetDevice(req?: ForgetDeviceRequest | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  fetchDevices(): Promise<AuthDevice[]> {
    throw new Error("Method not implemented.");
  }
  readonly TOTP: TOTPNamespace = {
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
  fetchUserAttributes(
    req?: FetchUserAttributesRequest | undefined
  ): Promise<AuthUserAttribute[]> {
    throw new Error("Method not implemented.");
  }
  updateUserAttributes(
    req: UpdateUserAttributesRequest<
      AuthStandardAtrributeKey | CustomAttribute,
      CognitoUpdateUserAttributesOptions
    >
  ): Promise<
    UpdateUserAttributesResult<AuthStandardAtrributeKey | CustomAttribute>
  > {
    throw new Error("Method not implemented.");
  }
  updateUserAttribute(
    req: UpdateUserAttributeRequest<
      AuthStandardAtrributeKey | CustomAttribute,
      CognitoUpdateUserAttributeOptions
    >
  ): Promise<
    UpdateUserAttributeResult<AuthStandardAtrributeKey | CustomAttribute>
  > {
    throw new Error("Method not implemented.");
  }
  confirmUserAttribute(
    req: ConfirmUserAttributeRequest<AuthStandardAtrributeKey | CustomAttribute>
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  resendUserAttributeConfirmationCode(
    req: ResendUserAttributeConfirmationCodeRequest<
      AuthStandardAtrributeKey | CustomAttribute,
      CognitoResendUserAttributeConfirmationCodeOptions
    >
  ): Promise<
    AuthCodeDeliveryDetails<AuthStandardAtrributeKey | CustomAttribute>
  > {
    throw new Error("Method not implemented.");
  }
  deleteUser(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCurrentUser(req?: GetCurrentUserRequest | undefined): Promise<AuthUser> {
    throw new Error("Method not implemented.");
  }
  setPreferredMFA(req: SetPreferredMFARequest<CognitoMFAType>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updatePassword(req: UpdatePasswordRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
  resetPassword(
    req: ResetPasswordRequest<CognitoResetPasswordOptions>
  ): Promise<ResetPasswordResult> {
    throw new Error("Method not implemented.");
  }
  confirmResetPassword(req: ConfirmResetPasswordRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
  signOut(req?: SignOutRequest | undefined): Promise<SignOutResult> {
    throw new Error("Method not implemented.");
  }
}
