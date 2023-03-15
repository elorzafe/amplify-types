# RFC: Amplify JS TypeScript Improvements

Amplify JS is looking to improve our TypeScript support across the library to better serve our customers and provide a more intuitive & idiomatic developer experience. To this end, we are requesting your feedback on a variety of changes and improvements that will be available to you in our next major version release.

This RFC is broken down into sections covering:

- Library-wide TypeScript improvements
- Changes to some of our core utilities such as `Hub` and Amplify configuration
- Specific improvements to the `Auth`, `Storage`, and `API` categories and associated APIs

We're also requesting feedback on any other TypeScript issues or pain points that you may have encountered not explicitly covered in this RFC.

# Library-wide TypeScript Improvements

Amplify JS will be making the following improvements to our TypeScript support. These improvements will be applied across the entire library, not just the categories highlighted below.

- `strict` typings — We will be applying `strict` mode to the entire library to improve the usability of our types. This will allow you to more easily construct API requests, avoid errors, and have higher confidence when handling API responses. Amplify JS will just work with your application without any additional configurations if you have strict mode on.
- Better runtime error typing — We will provide utilities for asserting type information of runtime errors emitted by Amplify.
- Upgraded TypeScript version — We will be upgrading the version of TypeScript that Amplify uses and provide explicit type definitions for developers using older versions. This will provide a variety benefits such as removing the need to specify `skipLibCheck` when using Amplify with newer versions of TypeScript.

# Utility Changes

Amplify is proposing the following changes to our core utilities.

## TypeScript support for Amplify Hub channels

We are improving developer experience by adding strict type support to Hub channels, events, and payloads. An example of the developer experience when listening for `auth` events is highlighted below.

**Amplify Channel Usage**

```Typescript
Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signInFailure':
      const data = payload.data;
      break;
  }
});
```

**Current DX (v5)**

<img src="https://user-images.githubusercontent.com/70438514/222809592-ee475b84-f290-4215-bed5-27055a8a91ec.gif" width="450" alt="auth-hub-v5">

**Proposed DX (v6)**

<img src="https://user-images.githubusercontent.com/70438514/222809593-98fa7bba-96f9-4a45-8cf5-c71a78a34637.gif" width="450" alt="auth-hub-v6">

## TypeScript support for custom Hub channels

We are improving developer experience by adding strict type support to custom Hub channels, events, and payloads.

**Current Usage (v5)**

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

**Current DX (v5)**

<img src="https://user-images.githubusercontent.com/70438514/222809595-1181fe84-f375-4d30-a866-c654b1c97024.gif" width="450" alt="custom-hub-v5">

**Proposed Usage (v6)**

```Typescript
type CustomChannel = 'custom_channel';

// Each key in the map represents a payload event and the key value is the data type for that event.
// Note: If an event is assigned the null type, the payload object will not contain a data key.
type CustomEventDataMap = {
  A: number;
  B: string;
  C: void;
  D: Object
};

Hub.dispatch<CustomChannel, CustomEventDataMap >('custom_channel', {
  event: 'A',
  data: 42
});

Hub.listen<CustomChannel, CustomEventDataMap>(
  'custom_channel',
  ({ payload }) => {
    let data;

    switch (payload.event) {
      case 'A':
        data = payload.data;
        break;
      case 'B':
        data = payload.data;
        break;
      case 'C':
        // Type C doesn't have any associated event data
        // @ts-expect-error
        data = payload.data;
        break;
      case 'D':
        data = payload.data;
        break;
    }
  }
);
```

**Proposed DX (v6)**

<img src="https://user-images.githubusercontent.com/70438514/222813252-19c4e4e7-b56c-46ed-82e7-1cde6293d19e.gif" width="600" alt="custom-hub-v6">

## TypeScript support for Amplify Configuration

To help developers configure Amplify categories, we are introducing type support for the `Amplify.configure` API. This will allow you to easily setup your AWS resources if you are connecting Amplify JS to resources you have not created directly with the Amplify CLI. The examples below demonstrate an `Auth` configuration.

**Current Usage (v5)**

```Typescript
const authConfig = {
  userPoolId: 'us-east-1_0yqxxHm5q',
  userPoolClientId: '3keodiqtm52nhh2ls0vQfs5v1q',
  signUpVerificationMethod: 'code'
};

Amplify.configure({
  Auth: authConfig
});
```

**Current DX (v5)**

<img src="https://user-images.githubusercontent.com/70438514/222543613-50124bf6-a5d8-4b6f-9196-320100922ec7.png" width="600" alt="configure-v5">

**Proposed Usage (v6)**

```Typescript
const authConfig : AuthConfig = {
  userPoolId: 'us-east-1_0yqxxHm5q',
  userPoolClientId: '3keodiqtm52nhh2ls0vQfs5v1q',
  signUpVerificationMethod: 'code'
};

Amplify.configure({
  Auth: authConfig
});
```

**Proposed DX (v6)**

![configure-v6](https://user-images.githubusercontent.com/70438514/222813249-f2782358-27c5-4d16-b5d4-9f4fd6d1b594.gif)

Try out the proposed types here: https://stackblitz.com/edit/rfc-typescript-v6?file=examples-core.ts

# `Auth` Category Changes

Amplify is proposing the following changes for the `Auth` category. Similar changes will be applied across all of the `Auth` APIs but examples for specific APIs are highlighted below.

## TypeScript support for user attributes

User attributes inference on the `signUp` API.

**Current Usage (v5)**

```Typescript
Auth.signUp({
  username: 'username',
  password: '*******',
  attributes: {
    email: 'email@domain.com'
  }
});
```

**Current DX (v5)**

![signup-v5](https://user-images.githubusercontent.com/70438514/222456624-b4af7349-db9d-4304-9cdc-08cf649e2d31.png)

**Proposed Usage (v6)**

```Typescript
Auth.signUp({
  username: 'username',
  password: '********',
  options: {
    userAttributes: [{ userAttributeKey: 'email', value: 'email@domain.com' }],
  },
});
```

**Proposed DX (v6)**

<img src="https://user-images.githubusercontent.com/70438514/222456627-f196eedf-90e5-4bb0-81a7-78e11d88b09b.png" width="600" alt="signup-v6">

## Predictable API responses

We are improving **_DX_** by providing descriptive API responses to help developers complete auth flows. An example for the `confirmSignUp` API is highlighted below.

**Current Usage (v5)**

```Typescript
const resp = await Auth.confirmSignUp('username', '112233')

if (resp === 'SUCCESS'){
  // Show login component
}
```

**Current DX (v5)**

![confirmSignUp-v5](https://user-images.githubusercontent.com/70438514/222456621-fca2d313-3d39-4a1e-8bcb-a1e86235bd06.png)

**Proposed Usage (v6)**

```Typescript

const resp = await confirmSignUp({
  username: 'username',
  confirmationCode: '112233',
});

if (resp.isSignUpComplete) {
  // Show login component
}

```

**Proposed DX (v6)**

<img src="https://user-images.githubusercontent.com/70438514/222456623-34d48988-5e3d-43be-bc9a-7c6d8ecb0b00.png" width="650" alt="confirmSignUp-v6">

Try out the proposed types here: https://stackblitz.com/edit/rfc-typescript-v6?file=examples-auth.ts

# `Storage` Category Changes

Amplify is proposing the following changes for the `Storage` category.

## Introduction of object reference types

In order to permit better interoperability between `storage` APIs we will introduce `StorageObjectReference` & `StoragePrefixReference` types to represent items in cloud storage. An example for copying an object from one access level to another is highlighted below.

**Current Usage (v5)**

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

**Proposed Usage (v6)**

```TypeScript
// List all public photos
const listResponse = await Storage.list({
  path: getPathReference('photos/', { level: 'public' })
})
const firstPhoto = listResponse.files?.[0];

/*
As a note, APIs will allow developers to specify keys by string if they do not need to override the access level. For
example, the following operation will list all files for the current user.
*/
const listResponseDefault = await Storage.list({
  path: 'photos/'
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

**Current Usage (v5)**

```TypeScript
// List public photos
const listResponse = await Storage.list('photos/', { level: 'public' });
const firstPhoto = listResponse.results?.[0];

// Generate a pre-signed URL for a file
const presignedUrl = await Storage.get(firstPhoto.key, { level: 'public' });

// Download a file
const downloadResult = await Storage.get(firstPhoto.key, { download: true, level: 'public' });
```

**Proposed Usage (v6)**

```TypeScript
// List public photos
const listResponse = await Storage.list({
  path: getPathReference('photos/', { level: 'public' })
})
const firstPhoto = listResponse.files?.[0];

// Generate a pre-signed URL for a file
const presignedUrl = await Storage.getUrl({ key: firstPhoto });

// Download a file
const downloadResult = await Storage.download({ key: firstPhoto });
```

## Changes to the `put` return object

To better capture customer intent the `put` API will be renamed to `upload`. Additionally `upload` will enable resumability by default in order to simplify API usage and remove the need to provide callbacks for monitoring upload status in favor of a Promise.

**Current Usage (v5)**

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

**Proposed Usage (v6)**

```TypeScript
// Upload a public file with resumability enabled by default
const uploadTask = Storage.upload({
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

Try out the proposed `storage` types here: https://stackblitz.com/edit/rfc-typescript-v6?file=examples-storage.ts

# `API` Category Changes

Amplify is proposing the following changes for the `API` category.

## First param is an object with named parameters

To improve the readability of our APIs we will be introducing an object parameter to capture request parameters.

**Current Usage (v5)**

```typescript
const apiName = "MyApiName";
const path = "/path";
const myInit = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: "param", // OPTIONAL
  },
};

const result = await API.get(apiName, path, myInit);
```

**Proposed Usage (v6)**

```typescript
await API.get(
  {
    apiName: 'MyApi',
    path: '/items',
    authMode: 'AWS_IAM',
  },
  {
    headers: {
      'custom-header': 'x',
    },
  }
);
```

## Adding TypeScript generics to request body and response

To improve developer experience and permit more strict typing we will be adding generic support to our `API` category APIs.

**Current Usage (v5)**

Amplify v5 does not support using generics for the request body or response.

**Proposed Usage (v6)**

```typescript
type MyApiResponse = { firstName: string; lastName: string };

const result = await API.get<MyApiResponse>({
  apiName: 'MyApi',
  path: '/getName',
});

console.log(`The name is ${result.body.firstName} ${result.body.lastName}`);

const result = await API.put<string, { data: Array<number> }>(
  {
    apiName: '',
    path: '/',
    authMode: 'API_KEY',
  },
  {
    headers: {
      'Content-type': 'text/plain',
    },
    body: 'this is my content',
  }
);

result.body.data.forEach((value) => console.log(value));
```

## GraphQL operations have been split into query, mutation, and subscription

To better capture customer intent and simplify API types we will split up the `graphql` API into individual APIs for queries, mutations, and subscriptions.

**Current Usage (v5)**

```typescript
const todoDetails: CreateTodoInput = {
  name: 'Todo 1',
  description: 'Learn AWS AppSync',
};

const newTodo = await API.graphql<GraphQLQuery<CreateTodoMutation>>({
  query: mutations.createTodo,
  variables: { input: todoDetails },
});

const subscription = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
  graphqlOperation(subscriptions.onCreateTodo)
).subscribe({
  next: ({ provider, value }) => console.log({ provider, value }),
  error: (error) => console.warn(error),
});
```

**Proposed Usage (v6)**

```typescript
type MyQueryType = {
  result: {
    id: string;
    name: string;
    description: string;
  };
};

const result = await API.graphqlQuery<MyQueryType>({
  document: 'query getTodo...',
});

console.log(
  `Todo : ${result.data?.id}: ${result.data?.name} (${result.data?.description})`
);

type MyMutationType = {
  variables: {
    id: number;
    name: string;
    description: string;
  };
  result: {
    id: number;
    name: string;
    description: string;
  };
};

const result = await API.graphqlMutation<MyMutationType>({
  document: 'mutation createTodo....',
  variables: {
    id: 123,
    name: 'My Todo',
    description: 'This is a todo',
  },
});

console.log(
  `Todo : ${result.data?.id}: ${result.data?.name} (${result.data?.description})`
);

API.graphqlSubscription<MyQueryType>({
  document: 'subscription OnCreateTodo...',
}).subscribe({
  next: (result) =>
    console.log(
      `Todo info: ${result.data?.id}: ${result.data?.name} (${result.data?.description})`
    ),
});
```

## Type narrowing on runtime errors

**Current Usage (v5)**

Amplify v5 does not support narrowing down errors.

**Proposed Usage (v6)**

```typescript
try {
  await API.get({
    apiName: 'myApi',
    path: '/',
  });
} catch (err: unknown) {
  if (err instanceof API.NetworkError) {
    // Consider retrying
  } else if (err instanceof API.HTTPError) {
    // Check request parameters for mistakes
  } else if (err instanceof API.CancelledError) {
    // Request was cancelled
  } else if (err instanceof API.BlockedError) {
    // CORS related error
  } else {
    // Other error
  }
}
```

Try out the proposed `api` types here: https://stackblitz.com/edit/rfc-typescript-v6?file=examples-api.ts
