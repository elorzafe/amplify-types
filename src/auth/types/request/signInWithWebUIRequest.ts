import { AuthProvider } from "../models/authProvider";
import { AuthServiceOptions } from "../options/authServiceOptions";
import { SignInWithWebUIOptions } from "../options/signInWithWebUIOptions";


export type SignInWithWebUIRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  provider: AuthProvider;
  options?: SignInWithWebUIOptions<ServiceOptions>;
};
