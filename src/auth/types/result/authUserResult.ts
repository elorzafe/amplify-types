import { AuthSignInDetails } from "../models/authSignInDetails";


export type AuthUser<
  SignInDetails extends AuthSignInDetails = AuthSignInDetails
> = {
  username: string;
  userId: string;
  signInDetails: SignInDetails;
};


