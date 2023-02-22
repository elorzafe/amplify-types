import { TOTPNamespace } from "./cognito/types/totpNameSpace";
import { AuthDevice } from "./types/authDevice";
import { AuthSession } from "./types/authSession";
import { AuthCodeDeliveryDetails, AuthUserAttribute } from "./types/models";
import {
  ConfirmResetPasswordRequest,
  ConfirmSignInRequest,
  ConfirmSignUpRequest,
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
} from "./types/request";
import { GetCurrentUserRequest } from "./types/request/getCurrentUserRequest";
import {
  AuthSignInResult,
  AuthSignUpResult,
  AuthUser,
  ResetPasswordResult,
  SignOutResult,
  UpdateUserAttributesResult,
} from "./types/result";
import { UpdateUserAttributeResult } from "./types/result/updateUserAttributeResult";
import { AuthSignInStep } from "./types/step";

export interface AuthInterface {
  signUp(req: SignUpRequest): Promise<AuthSignUpResult>;

  confirmSignUp(req: ConfirmSignUpRequest): Promise<AuthSignUpResult>;

  resendSignUpCode(
    req: ResendSignUpCodeRequest
  ): Promise<AuthCodeDeliveryDetails>;

  signIn(req: SignInRequest): Promise<AuthSignInResult>;

  confirmSignIn<
    NextSignInStep extends Exclude<
      AuthSignInStep,
      | AuthSignInStep.DONE
      | AuthSignInStep.CONFIRM_SIGN_UP
      | AuthSignInStep.RESET_PASSWORD
    >
  >(
    req: ConfirmSignInRequest[NextSignInStep]
  ): Promise<AuthSignInResult>;

  signInWithWebUI(req: SignInWithWebUIRequest): Promise<AuthSignInResult>;

  fetchAuthSession(req?: FetchAuthSessionRequest): Promise<AuthSession>;

  rememberDevice(): Promise<void>;

  forgetDevice(req?: ForgetDeviceRequest): Promise<void>;

  fetchDevices(): Promise<AuthDevice[]>;

  readonly TOTP: TOTPNamespace;

  fetchUserAttributes(
    req?: FetchUserAttributesRequest
  ): Promise<AuthUserAttribute[]>;

  updateUserAttributes(
    req: UpdateUserAttributesRequest
  ): Promise<UpdateUserAttributesResult>;

  updateUserAttribute(
    req: UpdateUserAttributeRequest
  ): Promise<UpdateUserAttributeResult>;

  confirmUserAttribute(req: ConfirmUserAttributeRequest): Promise<void>;

  resendUserAttributeConfirmationCode(
    req: ResendUserAttributeConfirmationCodeRequest
  ): Promise<AuthCodeDeliveryDetails>;

  deleteUser(): Promise<void>;

  getCurrentUser(req?: GetCurrentUserRequest): Promise<AuthUser>;

  setPreferredMFA(req: SetPreferredMFARequest): Promise<void>;

  updatePassword(req: UpdatePasswordRequest): Promise<void>;

  resetPassword(req: ResetPasswordRequest): Promise<ResetPasswordResult>;

  confirmResetPassword(req: ConfirmResetPasswordRequest): Promise<void>;

  signOut(req?: SignOutRequest): Promise<SignOutResult>;
}
