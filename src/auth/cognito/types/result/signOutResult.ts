import { SignOutResult } from "../../../types/result";

export class CompleteSignOut implements SignOutResult {
    signedOutLocally = true;
  }
  
  export class FailedSignOut implements SignOutResult {
    signedOutLocally = false;
    error: Error;
    constructor(error:Error){
      this.error=error
    }
  }
  
  export class PartialSignOut implements SignOutResult {
    signedOutLocally = true;
    revokeTokenError?: AWSCognitoRevokeTokenError;
    globalSignOutError?: AWSCognitoGlobalSignOutError;
    hostedUIError?: AWSCognitoHostedUIError;
    constructor(
      revokeTokenError?: AWSCognitoRevokeTokenError,
      globalSignOutError?: AWSCognitoGlobalSignOutError,
      hostedUIError?: AWSCognitoHostedUIError
    ) {
      this.revokeTokenError = revokeTokenError;
      this.globalSignOutError = globalSignOutError;
      this.hostedUIError = hostedUIError;
    }
  }
  
  export type AWSCognitoRevokeTokenError = {
    refreshToken: string;
    error: Error;
  };
  
  export type AWSCognitoGlobalSignOutError = {
    accessToken: string;
    error: Error;
  };
  
  export type AWSCognitoHostedUIError = {
    error: Error;
  };