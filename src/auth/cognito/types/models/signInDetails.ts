
import { AuthProvider } from "../../../types/models/authProvider";
import { AuthSignInDetails } from "../../../types/models/authSignInDetails";
import { AuthFlowType } from "./authFlowType";




export type CognitoSignInDetails =
  | CognitoSignInDetailsApiBased
  | CognitoSignInDetailsHostedUi;

export interface CognitoSignInDetailsApiBased extends AuthSignInDetails {
  username: String;
  authFlowType: AuthFlowType;
}
export interface CognitoSignInDetailsHostedUi extends AuthSignInDetails {
  provider?: AuthProvider;
}
