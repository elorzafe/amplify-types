import { AuthUserAttribute } from "../../../types/models/authUserAttribute";
import { ClientMetadata, CognitoUserAttributeKey } from "../models";



export type CognitoConfirmSignInOptions ={
  userAttributes?: AuthUserAttribute<CognitoUserAttributeKey>[]
  clientMetadata?: ClientMetadata;
}
