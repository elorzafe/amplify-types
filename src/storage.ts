// Storage utility types
enum StorageAccessLevel {
  Public = 'public',
  Private = 'private',
  Protected = 'protected'
};

enum PageSize {
  All = 'ALL'
};

enum EncryptionOption {
  AES256 = 'AES256',
  KMS = 'aws:kms'
}

enum ACLOption {
  AuthenticatedRead = 'authenticated-read',
  AWSExecRead = 'aws-exec-read',
  BucketOwnerFullControl = 'bucket-owner-full-control',
  BucketOwnerRead = 'bucket-owner-read',
  Private = 'private',
  PublicRead = 'public-read',
  PublicReadWrite = 'public-read-write'
}

type TransferProgress = {
  readonly transferred: number;
  readonly total: number;
};

type AccessLevelConfig = {
  readonly accessLevel?: StorageAccessLevel;
  readonly identityId?: string;
}

type StorageObjectReference = {
  readonly key: string;
  readonly size?: number;
  readonly eTag?: string;
  readonly lastModified?: Date;
};

declare class StorageError extends Error {};

// Common request parameters
type ServerSideEncryptionParameters = {
  encryptionOptions: {
    serverSideEncryption?: EncryptionOption;
    SSECustomerAlgorithm?: string;
    SSECustomerKey?: Buffer | string;
    SSECustomerKeyMD5?: string;
    SSEKMSKeyId?: string;
  }
};

type ResponseHeaderParameters = {
  headerOptions: {
    cacheControl?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    contentLanguage?: string;
    contentType?: string;
    expires?: Date;
  };
};

type StorageObjectParameters = {
  acl?: ACLOption;
  metadata?: {[key: string]: string};
};

type CommonStorageParameters = {
  track?: boolean;
} & ResponseHeaderParameters & ServerSideEncryptionParameters & AccessLevelConfig;

// API Common
/**
 * Utility to generate a reference for the specified file for use with other Storage APIs.
 * 
 * @experimental
 * 
 * @param key - A file key that will be used to generate the reference.
 * @returns A StorageObjectReference for the file.
 */
declare function getFileReference(key: string): StorageObjectReference;

// API Get
type DownloadMetadata = {
  attempts: number;
  headers: Array<Record<string, string>>;
  totalRetryDelay: number;
  statusCode: number;
  requestId?: string;
};

type GetURLRequest = {
  file: StorageObjectReference;
  expiresIn?: number;
} & CommonStorageParameters;

type DownloadRequest = {
  file: StorageObjectReference;
  onProgress?: (progress: TransferProgress) => void;
} & CommonStorageParameters;

type DownloadResponse = {
  content: Blob;
  contentLength: number;
  contentType: string;
  file: StorageObjectReference;
  metadata: DownloadMetadata;
};

/**
 * Generates a pre-signed URL for downloading the specified reference.
 * 
 * @remarks
 * Pre-signed URLs are usable by anyone with the URL, regardless of their access level. This method will not attempt 
 * to check if the file exists.
 * 
 * @throws {@link StorageError} If an error occurs while generating the pre-signed URL.
 * 
 * @experimental
 * 
 * @param {GetURLRequest} request - A GetURLRequest object.
 * @returns A promise that will resolve with the pre-signed file URL.
 */
declare function getUrl(request: GetURLRequest): Promise<string>;

/**
 * Downloads the specified object from S3.
 * 
 * @throws {@link StorageError} If an error occurs while downloading the file from S3.
 * 
 * @experimental
 * 
 * @param {DownloadRequest} request - A DownloadFileRequest object.
 * @returns A promise that will resolve with an object containing the file blob and other information.
 */
declare function download(request: DownloadRequest): Promise<DownloadResponse>;

// API List
type ListFilesRequest = {
  key: string;
  pageSize?: PageSize | number;
  nextToken?: string;
} & Pick<CommonStorageParameters, 'track' | 'accessLevel' | 'identityId'>;

type ListFilesResponse = {
  results: Array<StorageObjectReference>;
  hasNextToken: boolean;
  nextToken: string;
};

/**
 * Lists objects for the specified prefix.
 * 
 * @remarks
 * To list all objects at the specified access level, pass an empty string as the prefix with the request.
 * 
 * @throws {@link StorageError} If an error occurs while retrieving the file list.
 * 
 * @experimental
 * 
 * @param {ListFilesRequest} request - A ListFilesRequest object.
 * @returns A promise that will resolve with an object containing a list of matching objects from S3.
 */
declare function list(request: ListFilesRequest): Promise<ListFilesResponse>;

// API Put
type PutRequest = {
  content: string | File | Blob;
  file: StorageObjectReference;
  onProgress?: (progress: TransferProgress) => void;
  partSize?: number;
  useAccelerateEndpoint?: boolean;
} & StorageObjectParameters & CommonStorageParameters;

type PutResponse = {
  resume?: () => void;
  pause?: () => void;
  cancel?: () => void;
  getProgress?: () => TransferProgress;
  result: Promise<StorageObjectReference>;
};

/**
 * Uploads a file to S3.
 * 
 * @remarks
 * Reference the promise in the `result` field of the response to determine if the upload has completed or failed.
 * 
 * @experimental
 * 
 * @param {PutRequest} request - A PutFileRequest object.
 * @returns A PutResponse object containing functions for managing the upload and checking results.
 */
declare function put(request: PutRequest): PutResponse;

// API Copy
type CopyRequest = {
  source: {
    file: StorageObjectReference;
  } & AccessLevelConfig;
  destination: { 
    file: StorageObjectReference;
  } & AccessLevelConfig;
} & StorageObjectParameters & Omit<CommonStorageParameters, 'accessLevel' | 'identityId'>;

type CopyResponse = {
  file: StorageObjectReference;
};

/**
 * Copies files within your S3 bucket.
 * 
 * @remarks
 * Copies objects up to 5 GB per operation.
 * 
 * @throws {@link StorageError} In the event of a copy error.
 * 
 * @experimental
 * 
 * @param {CopyRequest} request - A CopyFileRequest object.
 * @returns A promise that will resolve with a reference for the copied file.
 */
declare function copy(request: CopyRequest): Promise<CopyResponse>;

// API Remove
type RemoveRequest = {
  file: StorageObjectReference;
} & AccessLevelConfig;

type RemoveResponse = {
  deleteMarker: boolean;
  requestCharged: boolean;
  versionId: string;
};

/**
 * Removes files within your S3 bucket.
 * 
 * @throws {@link StorageError} In the event of an error removing the file.
 * 
 * @experimental
 * 
 * @param {RemoveRequest} request - A RemoveRequest object.
 * @returns A promise that will resolve with 
 */
declare function remove(request: RemoveRequest): Promise<RemoveResponse>;

// API Cancel
type CancellableRequests = Promise<DownloadResponse | CopyResponse> | PutResponse;

/**
 * Cancels a pending Storage request.
 * 
 * @remarks
 * This API can be used to cancel pending download, put, and copy requests.
 * 
 * @experimental
 * 
 * @param {CancellableRequests} request - The promise returned by a download, put, or copy operation.
 */
declare function cancel(request: CancellableRequests): void;
