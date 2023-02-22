import { ClientMetadata } from "../models";


export type CognitoConfirmSignUpOptions = {
  clientMetadata?: ClientMetadata;
  forceAliasCreation?: boolean;
}
