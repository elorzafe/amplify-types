import { AuthError } from "./auth/authError";
import { AuthSignInResult, AuthSignUpResult } from "./auth/types/result";

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

type AmplifyChannel = "auth" | "storage" | "core" | "api" | "analytics" | "interactions" | "pubsub" | "datastore"


type AmplifyEventDataMap = Record<string, any>;

type AuthEvent =
  | "signIn"
  | "signInFailure"
  | "signUp"
  | "signUpFailure"
  | "confirmSignUp"
  | "tokenRefresh";

type AuthEventsWithOutData = Extract<"tokenRefresh", AuthEvent>;

type AuthEventDataMap = {
  signIn: AuthSignInResult;
  signInFailure: AuthError;
  signUp: AuthSignUpResult;
  signUpFailure: AuthError;
  confirmSignUp: AuthSignUpResult;
};

type HubCapsule<
  Channel extends string,
  Event extends string,
  EventMap extends AmplifyEventDataMap,
  EventsWithOutData extends string
> = {
  channel: Channel;
  payload: GetPayload<Event, EventMap, EventsWithOutData>;
  source: string;
  patternInfo?: string[];
};

type GetPayload<
  Events extends string,
  EventMap extends AmplifyEventDataMap = AmplifyEventDataMap,
  EventsWithOutData extends string = string
> = Events extends EventsWithOutData
  ? HubPayloadWithOutData<EventsWithOutData>
  : HubPayload<Events, EventMap>;

type HubCallback<
  Channel extends string,
  AmplifyEvent extends string = string,
  EventMap extends AmplifyEventDataMap = AmplifyEventDataMap,
  EventsWithOutData extends string = string
> = (
  capsule: HubCapsule<Channel, AmplifyEvent, EventMap, EventsWithOutData>
) => void;

type HubPayloadWithOutData<Event extends string> = {
  data?:any;
  event: Event;
  message?: string;
};

type HubPayload<
  Event extends string,
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = {
  event: Event;
  data: EventDataMap[Event];
  message?: string;
};

type AmplifyHubCallbackMap<Channel extends AmplifyChannel> = {
  auth: HubCallback<
    Channel,
    AuthEvent,
    AuthEventDataMap,
    AuthEventsWithOutData
  >;
  storage: HubCallback<Channel>;
  core: HubCallback<Channel>
  analytics: HubCallback<Channel>
  api: HubCallback<Channel>
  interactions: HubCallback<Channel>
  pubsub: HubCallback<Channel>
  datastore: HubCallback<Channel>
};

type GetHubCallBack<
  Channel extends string,
  Event extends string = string,
  EventWithOutData extends string = string,
  EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap
> = Channel extends AmplifyChannel
  ? AmplifyHubCallbackMap<Channel>[Channel]
  : HubCallback<Channel, Event, EventDataMap, EventWithOutData>;

type AnyChannel = string & {};

declare class HubClass {
  listen<
    Channel extends AmplifyChannel | AnyChannel,
    Event extends string = string,
    EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap,
    EventWithOutData extends string = string
  >(
    channel: Channel | RegExp,
    callback?: GetHubCallBack<Channel, Event, EventWithOutData, EventDataMap>,
    listenerName?: string
  ): void;

  dispatch<
    Channel extends AmplifyChannel | AnyChannel,
    Event extends string,
    EventDataMap extends AmplifyEventDataMap = AmplifyEventDataMap,
    EventWithOutData extends string = string
  >(
    channel: Channel,
    payload: GetHubCallBack<
      Channel,
      Event,
      EventWithOutData,
      EventDataMap
    > extends (
      arg: infer A extends Record<string, any>
    ) => void
      ? A["payload"]
      : never,
    source: string,
    ampSymbol?: Symbol
  ): void;
}

declare function httpClient(input: HTTPClientInput): Promise<Response>;

type HTTPClientMiddleware = () => {};

type HTTPClientInput = {
  middleware: [];
};
