# RFC: Amplify JS TypeScript Improvements

# Introduction of Functional APIs
- Merge with general improvements? Functional APIs will be used for v6 examples for each category
# General TypeScript Improvements
- Version upgrade
- Strict mode

# Utility Changes
- Hub typing
- Configuration

Try out the new types here: TODO Playground Link

# `Auth` Changes
- CognitoUser object is no longer required

Code sample for Amplify V5 (`aws-amplify@5`)
```TypeScript
async function mySignInAmplifyV5({ username, password}: {username: string, password: string}) {
  const user = await Auth.signIn({
    username,
    password
  });

  if (user.challengeName === 'SMS_MFA') {
    // persist reference of user and the MFA type on app state in case you have multiple options
    // display a component or prompt to ask for code
  }
  // ...
}

async function myConfirmSignAmplifyV5({user, code}: {user: CognitoUser, code: string, mfaType: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' }) {
  const loggedInUser = await Auth.confirmSignIn(user, code, mfaType);
  // done
}

```

Code sample of proposal for Amplify V6 (`aws-amplify@6`)
```TypeScript
async function mySignInAmplifyV6({ username, password }: { username: string, password: string }) {
  const signInResult = await Auth.signIn({ username, password });

  if (signInResult.nextStep.signInStep === AuthSignInStep.CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE) {
    // display a component or prompt to ask for code
  }
}

async function myConfirmSignInAmplifyV6({ code: string }) {
  const signInResult = await Auth.confirmSignIn({ code });

  // done
}
```

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

## Changes to the `put` Return Object
To better capture customer intent the `put` API will be renamed to `upload`. Additionally `upload` will enable resumability by default in order to simplify API usage and remove the need to provide callbacks for monitoring upload status in favor of a Promise.

**Amplify v5 (`aws-amplify@5`)**
```TypeScript
// Upload a public file with resumability enabled
const uploadTask = Storage.put('movie.mp4', fileBlob, {
  resumable: true,
  level: 'public',
  progressCallback: (progress) => {
    // Progress of upload
  },
  completeCallback: (event) => {
    // Upload finished
  },
  errorCallback: (err) => {
    // Upload failed
  }
});

// Pause & resume upload
uploadTask.pause();
uploadTask.resume();
```

**Proposed Amplify v6 (`aws-amplify@6`)**
```TypeScript
// Upload a public file with resumability enabled by default
const uploadTask = put({
  key: getObjectReference('movie.mpg', { level: 'public' }),
  content: fileBlob
});

// Pause & resume upload
let currentTransferStatus = uploadTask.pause();
currentTransferStatus = uploadTask.resume();

// Get the current progress of the upload
const currentTransferProgress = uploadTask.getProgress();

// Wait for the upload to finish (or fail)
const uploadedObjectReference = await uploadTask.result;
```

Try out the new types here: TODO Playground Link
# `API` & `Datastore` Changes

Try out the new types here: TODO Playground Link