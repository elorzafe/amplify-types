type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>> : never;
type StrictUnion<T> = StrictUnionHelper<T, T>

type AmplifyConfigure = {
    Auth?: AuthConfig,
    Storage?: StorageConfig,
    API?: APIConfig
}

export type StorageConfig = {};

export type APIConfig = {};
export type AuthConfig = StrictUnion<UserPoolConfig | IdentityPoolConfig | UserPoolAndIdentityPoolConfig>;

type UserPoolConfig = {
    userPoolId: string,
    userPoolClientId: string,
    signUpVerificationMethod?: 'code' | 'link',
    oauth?: {
        domain: string,
        scope: UserPoolScopes,
        redirectSignIn: string,
        redirectSignOut: string,
        responseType: 'code' | 'token'
    }
}

type UserPoolScope = 'phone' | 'email' | 'profile' | 'openid' | 'aws.cognito.signin.user.admin';

type UserPoolScopes = UserPoolScope[];

type IdentityPoolConfig = {
    identityPoolId: string,
}

type UserPoolAndIdentityPoolConfig =  UserPoolConfig & IdentityPoolConfig

type AmplifyType = {
    configure: (config: AmplifyConfigure) => void
}

export const Amplify: AmplifyType = {
    configure: function (config: AmplifyConfigure): void {
        throw new Error("Function not implemented.")
    }
}