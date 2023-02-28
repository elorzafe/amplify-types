# RFC: Amplify JS TypeScript Improvements

# Introduction of Functional APIs
# General TypeScript Improvements
- Version upgrade
- Strict mode

# Utility Changes
- Hub typing
- Configuration

Try out the new types here: TODO Playground Link

# `Auth` Changes

# `Storage` Changes
Amplify is proposing the following changes for the `Storage` category.

## Introduction of Object Reference Types
In order to permit better inoperability between `storage` APIs and to enable future improvements such as more granular bucket management, we will introduce `StorageObjectReference` & `StoragePrefixReference` types to represent items in cloud storage. An example for copying an object from one access level to another is highlighted below.

**Amplify v5 (`aws-amplify@5`)**
```TypeScript
// List all public photos
const listResponse = await Storage.list('photos/', { level: 'public' });
const firstPhoto = listResponse.results?.[0];

// Copy the first photo returned to the current user's private prefix
if (firstPhoto) {
  await Storage.copy({
    {
      key: firstPhoto.key,
      level: 'public'
    },
    {
      key: firstPhoto.key,
      level: 'private'
    }
  })
}
```

**Proposed Amplify v6 (`aws-amplify@6`)**
```TypeScript
// List all public photos
const listResponse = await list({
  key: getPrefixReference('photos/', { level: 'public' })
})
const firstPhoto = listResponse.files?.[0];

/*
As a note, APIs will allow customers to specify keys by string if they do not need to override the access level. For 
example, the following operation will list all files for the current user.
*/
const listResponseDefault = await list({
  key: 'photos/'
})

// Copy the first photo returned to the current user's private prefix
if (firstPhoto) {
  await copy({
    source: firstPhoto,
    destination: copyObjectReference(firstPhoto, { level: 'private' }),
  });
}
```

## Splitting up the `get` API
To better capture customer intent and simplify API types we will split up the `get` API into `getUrl` & `download`. An example for generating a pre-signed URL & downloading a file from the results of a `list` operation is highlighted below.

**Amplify v5 (`aws-amplify@5`)**
```TypeScript
// List public photos
const listResponse = await Storage.list('photos/', { level: 'public' });
const firstPhoto = listResponse.results?.[0];

// Generate a pre-signed URL for a file
const presignedUrl = await Storage.get(firstPhoto.key, { level: 'public' });

// Download a file
const downloadResult = await Storage.get(firstPhoto.key, { download: true, level: 'public' });

// Customer provided utility for handling downloaded file
downloadBlob(downloadResult.Body, 'download.jpg');
```

**Proposed Amplify v6 (`aws-amplify@6`)**
```TypeScript
// List public photos
const listResponse = await list({
  key: getPrefixReference('photos/', { level: 'public' })
})
const firstPhoto = listResponse.files?.[0];

// Generate a pre-signed URL for a file
const presignedUrl = await getUrl({ key: firstPhoto });

// Download a file
const downloadResult = await download({ key: firstPhoto });

// Customer provided utility for handling downloaded file
downloadBlob(downloadResult.content, 'download.jpg');
```

## Changes to `put` Return Object
To better capture customer intent the `put` API will be renamed to `upload`. Additionally `upload` will enable resumability by default in order to simplify API usage and remove the need to provide callbacks for monitoring upload status in favor of a Promise.

**Amplify v5 (`aws-amplify@5`)**
```TypeScript
// Upload a file with resumability enabled
const upload = Storage.put(file.name, file, {
  resumable: true,
});

```

**Proposed Amplify v6 (`aws-amplify@6`)**
```TypeScript

```

Try out the new types here: TODO Playground Link
# `API` & `Datastore` Changes

Try out the new types here: TODO Playground Link