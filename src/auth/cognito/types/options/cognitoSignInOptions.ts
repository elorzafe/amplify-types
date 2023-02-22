import { AuthFlowType, ClientMetadata } from "../models";



export type CognitoSignInOptions =  {
  authFlowType: AuthFlowType;
  clientMetaData?: ClientMetadata
};
