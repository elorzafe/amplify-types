import { AuthServiceOptions } from "../options/authServiceOptions";

export type ConfirmSignUpRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  confirmationCode: string;
  options?: { serviceOptions?: ServiceOptions };
};
