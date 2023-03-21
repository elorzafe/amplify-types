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

type AmplifyEventDataMap = { event: string; data?: unknown };

type AuthHubEventData =
  | { event: "signIn"; data: AuthSignInResult }
  | { event: "signUp"; data: AuthSignUpResult }
  | { event: "signUpFailure"; data: AuthError };

type HubCapsule<
  Channel extends string | RegExp,
  EventDataMap extends AmplifyEventDataMap
> = {
  channel: Channel;
  payload: HubPayload<EventDataMap>;
  source: string;
  patternInfo?: string[];
};

type HubCallback<
  Channel extends string | RegExp,
  EventData extends AmplifyEventDataMap = AmplifyEventDataMap
> = (capsule: HubCapsule<Channel, EventData>) => void;

type HubPayload<
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = EventDataMap & {
  message?: string;
};

type AmplifyHubCallbackMap<Channel extends AmplifyChannel> = {
  auth: HubCallback<Channel, AuthHubEventData>;
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
  eventData: EventDataMap;
};

// Hub
declare class HubClass {
  listen<
    ChannelMap extends AmplifyChannelMap,
    Channel extends ChannelMap["channel"] = ChannelMap["channel"]
  >(
    channel: Channel,
    callback: GetHubCallBack<Channel, ChannelMap["eventData"]>,
    listenerName?: string
  ): void;

  dispatch<
    ChannelMap extends AmplifyChannelMap,
    Channel extends ChannelMap["channel"] = ChannelMap["channel"]
  >(
    channel: Channel,
    payload: PayloadFromCallback<
      GetHubCallBack<Channel, ChannelMap["eventData"]>
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
