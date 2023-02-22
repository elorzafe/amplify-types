import { AuthServiceOptions } from "../options/authServiceOptions";

export type SignInRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  username: string;
  password?: string;
  options?:{ serviceOptions?: ServiceOptions;}
};
