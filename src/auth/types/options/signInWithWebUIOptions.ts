import { AuthServiceOptions } from "./authServiceOptions";


export type SignInWithWebUIOptions<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  customState?: string;
  serviceOptions?: ServiceOptions;
};