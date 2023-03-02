# RFC: Amplify JS TypeScript Improvements

Amplify JS is looking to improve our TypeScript support across the library to better serve our customers and provide a more intuitive & idiomatic developer experience. To this end, we are requesting your feedback on a variety of changes and improvements that will be available to you in our next major version release.

This RFC is broken down into sections covering:

- Library-wide TypeScript improvements
- Changes to some of our core utilities such as `Hub` and Amplify configuration
- Specific improvements to the `Auth`, `Storage`, and `API` categories and associated APIs

We're also requesting feedback on any other TypeScript issues or pain points that you may have encountered not explicitly covered in this RFC.

# Library-wide TypeScript Improvements

Amplify JS will be making the following improvements to our TypeScript support. These improvements will be applied across the entire library, not just the categories highlighted below.

- `strict` typings — We will be applying `strict` mode to the entire library to improve the usability of our types.
- Better runtime error typing — We will provide utilities for asserting type information of runtime errors emitted by Amplify.
- Upgraded TypeScript version — We will be upgrading the version of TypeScript that Amplify uses and provide explicit type definitions for customers using older versions. This will provide a variety benefits such as removing the need to specify `skipLibCheck` when using Amplify with newer versions of TypeScript.

# Utility Changes

Amplify is proposing the following changes to our core utilities.

## TypeScript support for Amplify Hub channels

We are improving developer experience by adding strict type support to Hub channels, events, and payloads. An example of the developer experience when listening for `auth` events is highlighted below.

**Amplify v5 & v6 (`aws-amplify@^5`)**

```Typescript
Hub.dispatch("auth", {
  event: "signInFailure",
  data: new AuthError("Sign-in failed"),
});

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

https://user-images.githubusercontent.com/70438514/222475294-9cf9f535-b717-4725-9e5a-7c362e74a054.mov

<br />

**Proposed Amplify v6 DX**

https://user-images.githubusercontent.com/70438514/222512918-ea72b2c4-9568-45e6-86c6-3c5226820e7d.mov

## TypeScript support for custom Hub channels

We are improving developer experience by adding strict type support to custom Hub channels, events, and payloads.

**Amplify v5 (`aws-amplify@5`)**

```Typescript
const customChannel = "custom_channel";
const customEvent = "custom_event";
const customData = "custom_data";

Hub.dispatch(channel, {
  event: customEvent,
  data: customData
});

Hub.listen(channel, ({ payload }) => {
  switch (payload.event) {
    case customEvent:
      const data = payload.data;
      break;
  }
});
```

**Amplify v5 DX**

https://user-images.githubusercontent.com/70438514/222475304-128de96a-9a06-4fcc-8f0d-8f19592ae9eb.mov

<br />

**Proposed Amplify v6 (`aws-amplify@6`)**

```Typescript
type customChannel = "custom_channel";

// Each key in the map represents a payload event and the key value is the data type for that event.
// Note: If an event is assigned the null type, the payload object will not contain a data key.
type customEventDataMap = {
  A: number;
  B: string;
  C: null;
  D: Object
};

Hub.dispatch<customChannel, customEventDataMap >("custom_channel", {
  event: "A",
  data: 42
});

Hub.listen<customChannel, customEventDataMap>("custom_channel", ({payload}) => {
  switch(payload.event) {
    case "A":
      payload.data;
      break;
    case "B":
      payload.data;
      break;
    case "C":
      payload.data;
      break;
    case "D":
      payload.data;
      break;
  }
});
```

**Proposed Amplify v6 DX**

https://user-images.githubusercontent.com/70438514/222475311-36b4f8bc-d338-4ad1-9910-5d3518fb71c0.mov

## TypeScript support for Amplify Configuration

To help customers configure Amplify categories, we are introducing type support for the `Amplify.configure` API. The examples below demonstrate an `Auth` configuration.

**Amplify v5 (`aws-amplify@5`)**

```Typescript
const authConfig = {
  userPoolId: "us-east-1_0yqxxHm5q",
  userPoolClientId: "3keodiqtm52nhh2ls0vQfs5v1q",
  signUpVerificationMethod: "code"
};

Amplify.configure({
  Auth: authConfig
});
```
**Amplify v5 DX**

<img width="494" alt="configure-v5" src="https://user-images.githubusercontent.com/70438514/222543613-50124bf6-a5d8-4b6f-9196-320100922ec7.png">

**Proposed Amplify v6 (`aws-amplify@6`)**

```Typescript
const authConfig : AuthConfig = {
  userPoolId: "us-east-1_0yqxxHm5q",
  userPoolClientId: "3keodiqtm52nhh2ls0vQfs5v1q",
  signUpVerificationMethod: "code"
};

Amplify.configure({
  Auth: authConfig
});
```
**Proposed Amplify v6 DX**

https://user-images.githubusercontent.com/70438514/222543618-d5c42798-28c5-41e9-9ff6-c9061b86ef43.mov

<br />

Try out the new types here: https://www.typescriptlang.org/play#gist/7332e86effa3b0d627eebfc71fad1aca

# `Auth` Category Changes

Amplify is proposing the following changes for the `Auth` category. Similar changes will be applied across all of the `Auth` APIs but examples for specific APIs are highlighted below.

## TypeScript support for user attributes

User attributes inference on the `signUp` API.

**Amplify v5 (`aws-amplify@5`)**

```Typescript

Auth.signUp({
  username: "username",
  password: "*******",
  attributes: {
    email: "email@domain.com"
  }
});

```

**Amplify v5 DX**

![signup-v5](https://user-images.githubusercontent.com/70438514/222456624-b4af7349-db9d-4304-9cdc-08cf649e2d31.png)

**Proposed Amplify v6 (`aws-amplify@6`)**

```Typescript

signUp({
  username: "username",
  password: "********",
  options: {
    userAttributes: [{ userAttributeKey: "email", value: "email@domain.com" }],
  },
});

```

**Proposed Amplify v6 DX**

<img width="556" alt="signup-v6" src="https://user-images.githubusercontent.com/70438514/222456627-f196eedf-90e5-4bb0-81a7-78e11d88b09b.png">

## Predictable API responses

We are improving **_DX_** by providing descriptive API responses to help customers complete auth flows. An example for the `confirmSignUp` API is highlighted below.

**Amplify v5 (`aws-amplify@5`)**

```Typescript

const resp = await Auth.confirmSignUp("username", "112233")

if (resp === "SUCCESS"){
  // Show login component
}

```

**Amplify v5 DX**

![confirmSignUp-v5](https://user-images.githubusercontent.com/70438514/222456621-fca2d313-3d39-4a1e-8bcb-a1e86235bd06.png)

**Proposed Amplify v6 (`aws-amplify@6`)**

```Typescript

const resp = await confirmSignUp({
  username: "username",
  confirmationCode: "112233",
});

if (resp.isSignUpComplete) {
  // Show login component
}

```

**Proposed Amplify v6 DX**

<img width="594" alt="confirmSignUp-v6" src="https://user-images.githubusercontent.com/70438514/222456623-34d48988-5e3d-43be-bc9a-7c6d8ecb0b00.png">

Try out the new types here: https://stackblitz.com/edit/rfc-auth?file=auth.ts

# `Storage` Category Changes

Amplify is proposing the following changes for the `Storage` category.

## Introduction of object reference types

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

## Changes to the `put` return object

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

# `API` Category Changes
Amplify is proposing the following changes for the `API` category.

## First param is an object with named parameters
To improve the readability of our APIs we will be introducing an object parameter to capture request parameters.
**Amplify v5 (`aws-amplify@5`)**

```typescript
const apiName = 'MyApiName';
const path = '/path';
const myInit = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: 'param' // OPTIONAL
  }
};

API.get(apiName, path, myInit)
  .then((response) => {
    // Add your code here
  })
  .catch((error) => {
    console.log(error.response);
  });
```
**Proposed Amplify v6 (`aws-amplify@6`)**
```typescript
API.get({
  apiName: 'MyApi',
  path: '/items',
  authMode: 'AWS_IAM'
}, myInit)
  .then((result) => {
    // Add your code here
  }).catch((error) => {
    console.log(error.response);
  });
```

## Adding TypeScript generics to request body and response
To improve developer experience and permit more strict typing we will be adding generic support to our `API` category APIs.

**Amplify v5 (`aws-amplify@5`)**

Amplify v5 does not support using generics for the request body or response.

**Proposed Amplify v6 (`aws-amplify@6`)**

```typescript
type MyApiResponse = { firstName: string, lastName: string };

API.get<MyApiResponse>({
    apiName: 'MyApi',
    path: '/getName'
}).then(result => {
    console.log(`The name is ${result.body.firstName} ${result.body.lastName}`)
});

API.put<string, { data: Array<number> }>({
    apiName: '',
    path: '/',
    authMode: "API_KEY"
}, {
    headers: {
        "Content-type": "text/plain",
    },
    body: "this is my content"
}).then((result) => {
    result.body.data.forEach((value) => console.log(value));
});
```

## GraphQL operations have been split into query, mutation, and subscription
To better capture customer intent and simplify API types we will split up the `graphql` API into individual APIs for queries, mutations, and subscriptions.

**Amplify v5 (`aws-amplify@5`)**

```typescript
import { API } from "aws-amplify";
import * as mutations from './graphql/mutations';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import { CreateTodoInput, CreateTodoMutation, OnCreateTodoSubscription } from './API';
import * as subscriptions from './graphql/subscriptions';

const todoDetails: CreateTodoInput = {
  name: 'Todo 1',
  description: 'Learn AWS AppSync'
};

const newTodo = await API.graphql<GraphQLQuery<CreateTodoMutation>>({ 
  query: mutations.createTodo, 
  variables: { input: todoDetails }
});

const subscription = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
  graphqlOperation(subscriptions.onCreateTodo)
).subscribe({
  next: ({ provider, value }) => console.log({ provider, value }),
  error: (error) => console.warn(error)
});
```
**Proposed Amplify v6 (`aws-amplify@6`)**

```typescript
type MyQueryType = {
  result: {
    id: string,
    name: string,
    description: string
  }
}

API.graphqlQuery<MyQueryType>({
  document: `query getTodo...`,
})
.then((result) => {
  console.log(`Todo : ${result.data?.id}: ${result.data?.name} (${result.data?.description})`);
});

type MyMutationType = {
  variables: {
    id: number,
    name: string,
    description: string
  },
  result: {
    id: number, 
    name: string, 
    description: string
  }
}

API.graphqlMutation<MyMutationType>({
  document: `mutation createTodo....`,
  variables: {
    id: 123,
    name: 'My Todo',
    description: 'This is a todo'
  }
})
.then((result) => {
  console.log(`Todo : ${result.data?.id}: ${result.data?.name} (${result.data?.description})`);
});

API.graphqlSubscription<MyQueryType>({ document: `subscription OnCreateTodo...`})
.subscribe({
  next: (result) => console.log(`Todo info: ${result.data?.id}: ${result.data?.name} (${result.data?.description})`),
});
```

## Type narrowing on runtime errors

**Amplify v5 (`aws-amplify@5`)**

Amplify v5 does not support narrowing down errors.

**Proposed Amplify v6 (`aws-amplify@6`)**

```typescript
import { HTTPError, NetworkError, BlockedError, CancelledError } from '@aws-amplify/api';

API.get({
  apiName: 'myApi',
  path: '/'
}).then((result) => {
  // do something with result
}).catch((err: unknown) => {
  if (err instanceof NetworkError) {
    // Consider retrying
  } else if (err instanceof HTTPError) {
    // Check request parameters for mistakes
  } else if (err instanceof CancelledError) {
    // Request was cancelled
  } else if (err instanceof BlockedError) {
    // CORS related error
  } else {
    // Other error
  }
});
```

Try out the new `api` types here: https://www.typescriptlang.org/play#gist/30759a4799f751df85945e73e9657695