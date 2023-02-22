

/**
 * @category credentials 
 */
export type AWSCognitoAuthSession = {
    isSignedIn: boolean,
    pluginData: {
        awsCredentials?: AWSCredentials,
        identityId?: string,
        userPoolTokens?: AWSCognitoUserPoolTokens,
        userSub?: string,
    }
}

/**
 * @category credentials 
 */
export type AWSCognitoUserPoolTokens = {
    accessToken: string,
    idToken?: string,
    refreshToken?: string
    expiration: Date
}

/**
 * @category credentials 
 */
export type AWSCredentials = {
    accessKeyId: string,
    secretKey: string,
    sessionToken: string,
    expiration: Date
}