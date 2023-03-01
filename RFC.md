# RFC: Amplify JS TypeScript Improvements
Amplify JS is looking to improve our TypeScript support across the library to better serve our customers and provide a more intuitive & idiomatic developer experience. To this end, we are requesting your feedback on a variety of changes and improvements that will be available to you in our next major version release.

This RFC is broken down into sections covering:
- Library-wide TypeScript improvements
- Changes to some of our core utilities such as `Hub` and Amplify configuration
- Specific improvements to the `Auth`, `Storage`, and `API` categories and associated APIs 


# Library-wide TypeScript Improvements
Amplify JS will be making the following improvements to our TypeScript support. These improvements will be applied across the entire library, not just the categories highlighted below.

- `strict` typings — We will be applying `strict` mode to the entire library to improve the usability of our types.
- Better runtime error typing — We will provide utilities for asserting type information of runtime errors emitted by Amplify.
- Upgraded TypeScript version — We will be upgrading the version of TypeScript that Amplify uses and provide explicit type definitions for customers using older versions. This will provide a variety benefits such as removing the need to specify `skipLibCheck` when using Amplify with newer versions of TypeScript.

# Utility Changes

Amplify is proposing the following changes for our core utilities.

## TypeScript support for Amplify Hub channels

We are improving **_DX_** by adding strict type support to Hub channels, events, and payloads. An example of the developer experience when listening for `auth` events is highlighted below.

**Amplify v5 & v6 (`aws-amplify@^5`)**

```Typescript

Hub.dispatch("auth", {
  event: "signInFailure",
  data: new AuthError("Sign-in failed"),
})

// Events and payload data are not inferred.
Hub.listen(channel, ({ payload }) => {
  switch (payload.event) {
    case "signInFailure":
      const data = payload.data;
      break;
  }
});
```

**Amplify v5 DX**

Todo: add screen shoots

**Amplify v6 DX**

Todo: add screen shoots

## TypeScript support for custom Hub channels

We are improving **_DX_** by adding strict type support to custom Hub channels, events, and payloads.

**Amplify v5 (`aws-amplify@5`)**

```Typescript
const customChannel = "custom_channel"
const customEvent = "custom_event"
const customData = "custom_data"

Hub.dispatch(channel, {
  event: customEvent,
  data: customData
})

Hub.listen(channel, ({ payload }) => {
  switch (payload.event) {
    case customEvent:
      const data = payload.data;
      break;
  }
});
```

**Amplify v5 DX**

Todo: add screenshoots

**Amplify v6 (`aws-amplify@6`)**

```Typescript
type customChannel = "custom_channel"

// Each key in the map represents a payload event and the key value is the data type for that event.
// Note: If an event is assigned the null type, the payload object will not contain a data key.
type customEventDataMap = {
  A: number;
  B: string;
  C: null;
  D: Object
}

Hub.dispatch<customChannel, customEventDataMap >("custom_channel", {
  event: "A" ,
  data: 42
})

Hub.listen<customChannel, customEventDataMap>("custom_channel", ({payload}) => {
  switch(payload.event) {
    case "A":
      payload.data;
      break
    case "B":
      payload.data
      break
    case "C":
      payload.data
      break
    case "D":
      payload.data
      break
  }
})
```

**Amplify v6 DX**

Todo: add screenshoots

## TypeScript support for Amplify Configuration

To help customers configure Amplify categories, we are introducing type support for the `Amplify.configure` API. The examples below demonstrate an `Auth` configuration.

**Amplify v5 (`aws-amplify@5`)**

```Typescript
const authConfig = {
  userPoolId: "us-east-1_0yqxxHm5q",
  userPoolClientId: "3keodiqtm52nhh2ls0vQfs5v1q",
  signUpVerificationMethod: "code"
}

Amplify.configure({
  Auth: authConfig
})

```

**Amplify v6 (`aws-amplify@6`)**

```Typescript
const authConfig:AuthConfig = {
  userPoolId: "us-east-1_0yqxxHm5q",
  userPoolClientId: "3keodiqtm52nhh2ls0vQfs5v1q",
  signUpVerificationMethod: "code"
}

Amplify.configure({
  Auth: authConfig
})
```

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
const listResponse = await Storage.list({
  key: getPrefixReference('photos/', { level: 'public' })
})
const firstPhoto = listResponse.files?.[0];

/*
As a note, APIs will allow customers to specify keys by string if they do not need to override the access level. For
example, the following operation will list all files for the current user.
*/
const listResponseDefault = await Storage.list({
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
const listResponse = await Storage.list({
  key: getPrefixReference('photos/', { level: 'public' })
})
const firstPhoto = listResponse.files?.[0];

// Generate a pre-signed URL for a file
const presignedUrl = await Storage.getUrl({ key: firstPhoto });

// Download a file
const downloadResult = await Storage.download({ key: firstPhoto });

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
const uploadTask = Storage.put({
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

Try out the new `storage` types here: https://www.typescriptlang.org/play#gist/292f4e24178bfca5881aa20961b930dc

# `API` & `Datastore` Changes

Try out the new types here: TODO Playground Link
