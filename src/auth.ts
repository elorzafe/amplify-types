export const Auth = {
    signIn(signInOptions: AuthSignInOptions): Promise<AuthSignInResult> {
        throw new Error('Not implemented');
    },
}

type AuthSignInOptions = {
    username: string,
    password?: string,
    validationData?: Record<string, string>,
    metadata?: Record<string, string>
}

type AuthSignInResult = {
    isSignedIn: boolean,
    nextStep: AuthNextSignInStep,
}

type AuthStandardAttributeKey =
    | "address"
    | "birthDate"
    | "email"
    | "emailVerified"
    | "familyName"
    | "gender"
    | "givenName"
    | "locale"
    | "middleName"
    | "name"
    | "nickname"
    | "phoneNumber"
    | "phoneNumberVerified"
    | "picture"
    | "preferredUsername"
    | "profile"
    | "sub"
    | "updatedAt"
    | "website"
    | "zoneInfo"


type AuthUserAttributeKey = AuthStandardAttributeKey
    | string | Record<string, string>


const enum DeliveryMedium {
    EMAIL = "EMAIL",
    SMS = "SMS",
    PHONE = "PHONE",
    UNKNOWN = "UNKNOWN",
}

type AuthCodeDeliveryDetails<UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey> = {
    destination: string,
    deliveryMedium: DeliveryMedium,
    attributeName: UserAttributeKey
}

type AuthNextSignInStep<UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey> = {
    signInStep: AuthSignInStep,
    codeDeliveryDetails?: AuthCodeDeliveryDetails,
    additionalInfo?: AdditionalInfo,
    totpCode?: string,
    missingAttributes?: UserAttributeKey[],
}

type AdditionalInfo = {
    [key: string]: string;
}

export enum AuthSignInStep {
    CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE = "CONFIRM_SIGN_IN_SMS_MFA_CODE",
    CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE = "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE",
    CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED = "NEW_PASSWORD_REQUIRED",
    CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE = "CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE",
    SELECT_MFA_TYPE = "SELECT_MFA_TYPE",
    CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",
    RESET_PASSWORD = "RESET_PASSWORD",
    DONE = "DONE",
}

