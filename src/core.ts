type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;
type StrictUnion<T> = StrictUnionHelper<T, T>;

type AmplifyConfigure = {
  Auth?: AuthConfig;
  Storage?: StorageConfig;
  API?: APIConfig;
};

export type StorageConfig = {
  bucket: string;
  region: string; // or scope it down to actual regions
};

export type APIConfig = {};
export type AuthConfig = StrictUnion<
  UserPoolConfig | IdentityPoolConfig | UserPoolAndIdentityPoolConfig
>;

type UserPoolConfig = {
  userPoolId: string;
  userPoolClientId: string;
  signUpVerificationMethod?: "code" | "link";
  oauth?: {
    domain: string;
    scope: UserPoolScopes;
    redirectSignIn: string;
    redirectSignOut: string;
    responseType: "code" | "token";
  };
};

type UserPoolScope =
  | "phone"
  | "email"
  | "profile"
  | "openid"
  | "aws.cognito.signin.user.admin";

type UserPoolScopes = UserPoolScope[];

type IdentityPoolConfig = {
  identityPoolId: string;
};

type UserPoolAndIdentityPoolConfig = UserPoolConfig & IdentityPoolConfig;

declare class Amplify {
  configure<AmplifyConf extends AmplifyConfigure>(
    config: AmplifyConfigure
  ): void;
}

type AmplifyChannel = "auth" | "api" | "storage" | "analytics";

type HubCapsule<
  Channel extends AmplifyChannel,
  Payload extends HubPayload = HubPayload
> = {
  channel: Channel;
  payload: Payload;
  source: string;
  patternInfo?: string[];
};

type SignInResult = {
  isSignedIn: boolean;
};

type SignUpResult = {
  isSignedUp: boolean;
};

type AuthError = {};

type AuthEvenDataMap = {
  signIn: SignInResult;
  signUp: SignUpResult;
  signIn_failure: AuthError;
  signUp_failure: AuthError;
};

type HubCallback<
  Channel extends AmplifyChannel,
  Event extends string = string,
  Data extends any = any,
  Payload extends HubPayload = HubPayload<Event, Data>
> = (capsule: HubCapsule<Channel, Payload>) => void;
type HubPayload<Event extends string = string, Data extends any = any> = {
  event: Event;
  data?: Data;
  message?: string;
};

type HubCallbackMap<
  Channel extends AmplifyChannel,
  Event extends string = string
> = {
  auth: HubCallback<
    Channel,
    string extends Event ? keyof AuthEvenDataMap : Event,
    AuthEvenDataMap[keyof AuthEvenDataMap]
  >;
  storage: HubCallback<Channel, Event>;
  analytics: HubCallback<Channel, Event>;
  api: HubCallback<Channel, Event>;
};

declare class HubClass {
  listen<
    Event extends string = string,
    Channel extends AmplifyChannel = AmplifyChannel
  >(
    channel: Channel | RegExp,

    callback?: HubCallbackMap<Channel, Event>[Channel],
    listenerName?: string
  ): void;

  dispatch(
    channel: string,
    payload: HubPayload,
    source: string,
    ampSymbol?: Symbol
  ): void;
}

declare function httpClient(input: HTTPClientInput): Promise<Response>;

type HTTPClientMiddleware = () => {};

type HTTPClientInput = {
  middleware: [];
};
