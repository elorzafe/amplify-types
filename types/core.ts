import { AuthError } from "./auth/authError";
import { AuthSignInResult, AuthSignUpResult } from "./auth/types/result";

// Utilities
declare function httpClient(input: HTTPClientInput): Promise<Response>;

type HTTPClientMiddleware = () => {};

type HTTPClientInput = {
  middleware: [];
};

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

type StorageConfig = {
  bucket: string;
  region: string; // or scope it down to actual regions
};

type APIConfig = {};
type AuthConfig = StrictUnion<
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

type AmplifyChannel =
  | "auth"
  | "storage"
  | "core"
  | "api"
  | "analytics"
  | "interactions"
  | "pubsub"
  | "datastore";

type AmplifyEventDataMap = Record<string, any>;

type AuthEvent =
  | "signIn"
  | "signInFailure"
  | "signUp"
  | "signUpFailure"
  | "confirmSignUp"
  | "tokenRefresh";

type GetAuthData<T extends AuthEvent> = T extends `${string}Failure`
  ? AuthError
  : T extends "signIn"
  ? AuthSignInResult
  : T extends "signUp" | "confirmSignUp"
  ? AuthSignUpResult
  : any;

type AuthEventDataMap = {
  [authEvent in AuthEvent]: GetAuthData<authEvent>;
};

type HubCapsule<
  Channel extends string | RegExp,
  EventMap extends AmplifyEventDataMap
> = {
  channel: Channel;
  payload: GetPayload<EventMap, keyof EventMap, GetEventsWithoutData<EventMap>>;
  source: string;
  patternInfo?: string[];
};

type GetEventsWithoutData<T extends Record<string, any>> = {
  [event in keyof T]: T[event] extends void ? event : never;
}[keyof T];

type GetPayload<
  EventMap extends AmplifyEventDataMap,
  Event extends keyof EventMap = keyof EventMap,
  EventsWithOutData extends keyof EventMap = never
> = Event extends EventsWithOutData
  ? HubPayloadWithOutData<EventsWithOutData>
  : HubPayload<EventMap, Event>;

type HubCallback<
  Channel extends string | RegExp,
  EventMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = (capsule: HubCapsule<Channel, EventMap>) => void;

type HubPayloadWithOutData<Event> = {
  event: Event;
  message?: string;
};

type HubPayload<
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap,
  Event extends keyof EventDataMap = keyof EventDataMap
> = {
  event: Event;
  data: EventDataMap[Event];
  message?: string;
};

type AmplifyHubCallbackMap<Channel extends AmplifyChannel> = {
  auth: HubCallback<Channel, AuthEventDataMap>;
  storage: HubCallback<Channel>;
  core: HubCallback<Channel>;
  analytics: HubCallback<Channel>;
  api: HubCallback<Channel>;
  interactions: HubCallback<Channel>;
  pubsub: HubCallback<Channel>;
  datastore: HubCallback<Channel>;
};

type GetHubCallBack<
  Channel extends string | RegExp,
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = Channel extends AmplifyChannel
  ? AmplifyHubCallbackMap<Channel>[Channel]
  : HubCallback<Channel, EventDataMap>;

type AnyChannel = string & {};

type PayloadFromCallback<T> = T extends (
  arg: infer A extends Record<string, any>
) => void
  ? A["payload"]
  : never;

type AmplifyChannelMap<
  Channel extends AmplifyChannel | AnyChannel = AmplifyChannel | AnyChannel,
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = {
  channel: Channel | RegExp;
  eventDataMap: EventDataMap;
};

// Hub
declare class HubClass {
  listen<ChannelMap extends AmplifyChannelMap>(
    channel: ChannelMap["channel"],
    callback: GetHubCallBack<ChannelMap["channel"], ChannelMap["eventDataMap"]>,
    listenerName?: string
  ): void;

  dispatch<ChannelMap extends AmplifyChannelMap>(
    channel: ChannelMap["channel"],
    payload: PayloadFromCallback<
      GetHubCallBack<ChannelMap["channel"], ChannelMap["eventDataMap"]>
    >,
    source?: string,
    ampSymbol?: Symbol
  ): void;
}

// Amplify
declare class Amplify {
  configure<AmplifyConf extends AmplifyConfigure>(
    config: AmplifyConfigure
  ): void;
}
