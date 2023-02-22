import { AuthServiceOptions } from "../options/authServiceOptions";

export type ResetPasswordRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  options?: { serviceOptions?: ServiceOptions };
};
