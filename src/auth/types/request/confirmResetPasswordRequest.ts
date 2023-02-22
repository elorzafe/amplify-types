import { AuthServiceOptions } from "../options/authServiceOptions";

export type ConfirmResetPasswordRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  newPassword: string;
  confirmationCode: string;
  options?: { serviceOptions?: ServiceOptions };
};
