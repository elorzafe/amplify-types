import { AuthServiceOptions } from "../options/authServiceOptions";

export type SignOutRequest<
  ServiceOptions extends AuthServiceOptions = AuthServiceOptions
> = {
  options?: {
    globalSignOut?: boolean;
    serviceOptions?: ServiceOptions;
  };
};
