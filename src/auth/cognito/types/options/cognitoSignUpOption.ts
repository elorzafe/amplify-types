import { ClientMetadata, ValidationData } from "../models";
import { AutoSignInOptions } from "./autoSignInOptions";


export type CognitoSignUpOptions = {
  validationData?: ValidationData;
  clientMetadata?: ClientMetadata;
  autoSignIn?: AutoSignInOptions;
}
