import { AuthServiceOptions } from "../options/authServiceOptions";

export type ResendSignUpCodeRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  options?: { serviceOptions?: ServiceOptions };
};
