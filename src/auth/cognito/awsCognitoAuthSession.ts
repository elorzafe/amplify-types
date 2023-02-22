import { AuthSession } from "../types/authSession";
import { Result } from "../types/models/result";
import { AWSCredentials } from "./types/credentials";
import { CognitoUserPoolTokens } from "./types/models";

export type CognitoAuthSessionConfig = {
    isSignedIn: boolean;
    credentials: Result<AWSCredentials>;
    userPoolTokens: Result<CognitoUserPoolTokens>;
    userSub: Result<string>;
    identityId: Result<string>;
  };
  
  
  
  
  export class AWSCognitoAuthSession implements AuthSession {
    isSignedIn: boolean;
    credentials: Result<AWSCredentials>;
    userPoolTokens: Result<CognitoUserPoolTokens>;
    userSub: Result<string>;
    identityId: Result<string>;
  
    constructor(config: CognitoAuthSessionConfig) {
      this.isSignedIn = config.isSignedIn;
      this.credentials = config.credentials;
      this.userPoolTokens = config.userPoolTokens;
      this.userSub = config.userSub;
      this.identityId = config.identityId;
    }
  }