type AmplifyConfigure = {
    Auth?: AuthConfig
}

//Amplify.configure({
//     Auth: {

//         // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//         identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        
//         // REQUIRED - Amazon Cognito Region
//         region: 'XX-XXXX-X',

//         // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//         // Required only if it's different from Amazon Cognito Region
//         identityPoolRegion: 'XX-XXXX-X',

//         // OPTIONAL - Amazon Cognito User Pool ID
//         userPoolId: 'XX-XXXX-X_abcd1234',

//         // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//         userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',

//         // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//         mandatorySignIn: false,
        
//         // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
//         // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
//         signUpVerificationMethod: 'code', // 'code' | 'link' 

//         // OPTIONAL - Configuration for cookie storage
//         // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//         cookieStorage: {
//         // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//             domain: '.yourdomain.com',
//         // OPTIONAL - Cookie path
//             path: '/',
//         // OPTIONAL - Cookie expiration in days
//             expires: 365,
//         // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//             sameSite: "strict" | "lax",
//         // OPTIONAL - Cookie secure flag
//         // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//             secure: true
//         },

//         // OPTIONAL - customized storage object
//         storage: MyStorage,
        
//         // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//         authenticationFlowType: 'USER_PASSWORD_AUTH',

//         // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//         clientMetadata: { myCustomKey: 'myCustomValue' },

//          // OPTIONAL - Hosted UI configuration
//         oauth: {
//             domain: 'your_cognito_domain',
//             scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//             redirectSignIn: 'http://localhost:3000/',
//             redirectSignOut: 'http://localhost:3000/',
//             responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//         }
//     }
// });

type AuthConfig = UserPoolConfig | IdentityPoolConfig | UserPoolAndIdentityPoolConfig;

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

type UserPoolAndIdentityPoolConfig = {
    userPoolId: string,
    identityPoolId: string,
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

type AmplifyType = {
    configure: (config: AmplifyConfigure) => void
}

export const Amplify: AmplifyType = {
    configure: function (config: AmplifyConfigure): void {
        throw new Error("Function not implemented.")
    }
}