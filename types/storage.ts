// Storage utility types
type StorageAccessLevel = 'public' | 'private' | 'protected';
type PageSize = 'ALL';
type EncryptionOption = 'AES256' | 'aws:kms';
type ACLOption = 
  'authenticated-read' |
  'aws-exec-read' |
  'bucket-owner-full-control' |
  'bucket-owner-read' |
  'private' |
  'public-read' |
  'public-read-write';
type TransferStatus =
  'IN_PROGRESS' |
  'PAUSED' |
  'CANCELLED' |
  'COMPLETE';

type TransferProgress = {
  readonly transferred: number;
  readonly total: number;
};

type AccessLevelConfig = {
  readonly level?: StorageAccessLevel;
  readonly identityId?: string;
};

type DownloadMetadata = {
  readonly attempts: number;
  readonly headers: Array<Record<string, string>>;
  readonly totalRetryDelay: number;
  readonly statusCode: number;
  readonly requestId?: string;
};

type StorageObjectMetadata = {
  readonly size?: number;
  readonly eTag?: string;
  readonly lastModified?: Date;
};

type StorageObjectReference = {
  readonly key: string;
  readonly metadata?: StorageObjectMetadata;
} & AccessLevelConfig;

type StoragePrefixReference = {
  readonly key: string;
} & AccessLevelConfig;

declare class StorageError extends Error {};

// Common request parameters
type ServerSideEncryptionParameters = {
  encryptionOptions?: {
    serverSideEncryption?: EncryptionOption;
    SSECustomerAlgorithm?: string;
    SSECustomerKey?: string;
    SSECustomerKeyMD5?: string;
    SSEKMSKeyId?: string;
  }
};

type ResponseHeaderParameters = {
  headerOptions?: {
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
} & ResponseHeaderParameters & ServerSideEncryptionParameters;

// Utility functions
/**
 * Utility to generate a reference for the specified file for use with other Storage APIs.
 * 
 * @param key - A file key that will be used to generate the reference.
 * @param accessLevel - Access level configuration associated with the object reference.
 * @returns A StorageObjectReference for the file.
 */
declare function getObjectReference(key: string, accessLevel?: AccessLevelConfig): StorageObjectReference;

/**
 * Utility to generate a storage prefix reference.
 * 
 * @param key - A storage prefix that will be used to generate the reference.
 * @param accessLevel - Access level configuration associated with the object reference.
 * @returns A StoragePrefixReference for the prefix.
 */
declare function getPrefixReference(key: string, accessLevel?: AccessLevelConfig): StoragePrefixReference;

/**
 * Utility for copying an existing object reference.
 * 
 * @param reference - The object reference to copy.
 * @param accessLevel - Optional updated access level associated with the copied reference.
 * @returns A new StorageObjectReference.
 */
declare function copyObjectReference(reference: StorageObjectReference, accessLevel?: AccessLevelConfig): StorageObjectReference;

// API Get
type GetURLRequest = {
  key: StorageObjectReference | string;
  expiresIn?: number;
} & CommonStorageParameters;

type DownloadRequest = {
  key: StorageObjectReference | string;
  onProgress?: (progress: TransferProgress) => void;
} & CommonStorageParameters;

type DownloadResponse = {
  content: Blob;
  contentLength: number;
  contentType: string;
  file: StorageObjectReference;
  metadata: DownloadMetadata;
};

// API List
type ListFilesRequest = {
  key: StoragePrefixReference | string;
  pageSize?: PageSize | number;
  nextToken?: string;
} & Omit<CommonStorageParameters, 'encryptionOptions'>;

type ListFilesResponse = {
  files: Array<StorageObjectReference>;
  hasNextToken: boolean;
  nextToken: string;
};

// API Put
type UploadRequest = {
  content: string | Blob | Uint8Array;
  key: StorageObjectReference | string;
  onProgress?: (progress: TransferProgress) => void;
  partSize?: number;
  useAccelerateEndpoint?: boolean;
} & StorageObjectParameters & CommonStorageParameters;

type UploadResponse = {
  resume?: () => TransferStatus;
  pause?: () => TransferStatus;
  cancel?: () => TransferStatus;
  getProgress?: () => TransferProgress;
  result: Promise<StorageObjectReference>;
};

// API Copy
type CopyRequest = {
  source: StorageObjectReference | string;
  destination: StorageObjectReference | string;
} & StorageObjectParameters;

type CopyResponse = {
  file: StorageObjectReference;
};

// API Remove
type RemoveRequest = {
  key: StorageObjectReference | string;
};

type RemoveResponse = {
  deleteMarker: boolean;
  requestCharged: boolean;
  versionId: string;
};

// API Cancel
type CancellableRequests = Promise<DownloadResponse | CopyResponse> | UploadResponse;

/**
 * Generates a pre-signed URL for downloading the specified reference.
 * 
 * @remarks
 * Pre-signed URLs are usable by anyone with the URL, regardless of their access level. This method will not attempt 
 * to check if the file exists.
 * 
 * @throws {@link StorageError} If an error occurs while generating the pre-signed URL.
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
 * @param {DownloadRequest} request - A DownloadFileRequest object.
 * @returns A promise that will resolve with an object containing the file blob and other information.
 */
declare function download(request: DownloadRequest): Promise<DownloadResponse>;

/**
 * Lists objects for the specified prefix.
 * 
 * @remarks
 * To specify a non-default access level, construct a `StoragePrefixReference` with the appropriate access level. The 
 * specified access level will be applied to objects returned by the API.
 * 
 * @throws {@link StorageError} If an error occurs while retrieving the file list.
 * 
 * @param {ListFilesRequest} request - A ListFilesRequest object.
 * @returns A promise that will resolve with an object containing a list of matching objects from S3.
 */
declare function list(request: ListFilesRequest): Promise<ListFilesResponse>;

/**
 * Uploads a file to S3.
 * 
 * @remarks
 * Reference the promise in the `result` field of the response to determine if the upload has completed or failed.
 * 
 * @param {PutRequest} request - A PutFileRequest object.
 * @returns A PutResponse object containing functions for managing the upload and checking results.
 */
declare function upload(request: UploadRequest): UploadResponse;

/**
 * Copies files within your S3 bucket.
 * 
 * @remarks
 * Copies objects up to 5 GB per operation.
 * 
 * @throws {@link StorageError} In the event of a copy error.
 * 
 * @param {CopyRequest} request - A CopyFileRequest object.
 * @returns A promise that will resolve with a reference for the copied file.
 */
declare function copy(request: CopyRequest): Promise<CopyResponse>;

/**
 * Removes files within your S3 bucket.
 * 
 * @throws {@link StorageError} In the event of an error removing the file.
 * 
 * @param {RemoveRequest} request - A RemoveRequest object.
 * @returns A promise that will resolve with 
 */
declare function remove(request: RemoveRequest): Promise<RemoveResponse>;

/**
 * Cancels a pending Storage request.
 * 
 * @remarks
 * This API can be used to cancel pending download, put, and copy requests.
 * 
 * @param {CancellableRequests} request - The promise returned by a download, put, or copy operation.
 */
declare function cancel(request: CancellableRequests): void;
