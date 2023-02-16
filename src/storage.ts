export const Storage = {
  //TODO: figure out how to get the storageuploadresult to show values
  /**
   * Allows you to upload objects.
   * @PutOptions object to upload file information
   *
   */
  uploadFile: function <Resumable extends boolean>(
    putOptions: PutOptions<Resumable>
    //TODO: How to fix the UploadTask and get it to be returned if resumable is set to true
  ): GetUploadResult<Resumable> {
    throw new Error("Function not implemented.");
  },
};

type PutOptions<Resumable extends boolean> = {
  //name
  name: string;
  uploadObject: any;
  uploadLocation: string;
  progressIndicator?: (progress: number) => void;
  level?: StorageAccessLevels;
  serverSideEncryptionOptions?: ServerSideEncryptionOptions;
  acl?: ACLOptions; // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/enums/objectcannedacl.html
  cacheControl?: ACLOptions; // (String) Specifies caching behavior along the request/reply chain
  contentDisposition?: "attachment"; //TODO: What does this mean?
  expires?: Date; //TODO: Is data here right to use?
  metadata?: Record<string, string>; // (map<String>) A map of metadata to store with the object in S3.
  resumable?: Resumable;
  useAccelerateEndpoint?: boolean;
};

type ACLOptions =
  | "authenticated-read"
  | "aws-exec-read"
  | "bucket-owner-full-control"
  | "bucket-owner-read"
  | "private"
  | "public-read"
  | "public-read-write";

type ServerSideEncryptionOptions = {
  serverSideEncryption?: "AES256" | "aws:kms";
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string; //TODO: fix this type
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string;
};

type StorageUploadResult = {
  objectName: boolean;
  location: string;
};

type StorageAccessLevels = "public" | "private" | "protected";

// type AuthSignInOptions = {
//     username: string,
//     password?: string,
//     validationData?: Record<string, string>,
//     metadata?: Record<string, string>
// }

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
  | "zoneInfo";

// type AuthUserAttributeKey = AuthStandardAttributeKey
//     | string | Record<string, string>

// const enum DeliveryMedium {
//     EMAIL = "EMAIL",
//     SMS = "SMS",
//     PHONE = "PHONE",
//     UNKNOWN = "UNKNOWN",
// }

// type AuthCodeDeliveryDetails<UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey> = {
//     destination: string,
//     deliveryMedium: DeliveryMedium,
//     attributeName: UserAttributeKey
// }

// type AuthNextSignInStep<UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey> = {
//     signInStep: AuthSignInStep,
//     codeDeliveryDetails?: AuthCodeDeliveryDetails,
//     additionalInfo?: AdditionalInfo,
//     totpCode?: string,
//     missingAttributes?: UserAttributeKey[],
// }

// type AdditionalInfo = {
//     [key: string]: string;
// }

// export enum AuthSignInStep {
//     CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE = "CONFIRM_SIGN_IN_SMS_MFA_CODE",
//     CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE = "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE",
//     CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED = "NEW_PASSWORD_REQUIRED",
//     CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE = "CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE",
//     SELECT_MFA_TYPE = "SELECT_MFA_TYPE",
//     CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",
//     RESET_PASSWORD = "RESET_PASSWORD",
//     DONE = "DONE",
// }

interface UploadTask {
  resume(): any;
  pause(): any;
  percent: number;
  isInProgress: boolean;
}

type GetUploadResult<Resumable extends boolean> = Resumable extends true
  ? UploadTask
  : Promise<StorageUploadResult>;
