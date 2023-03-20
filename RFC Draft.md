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

Related issues:
- [Could not compile library when strict mode is enabled in typescript (#7188)](https://github.com/aws-amplify/amplify-js/issues/7188)
- [Typescript 4.9.4 compatibility issue with catch(err) in Storage module (#10824)](https://github.com/aws-amplify/amplify-js/issues/10824)
- [Cannot use namespace 'Observable' as a type (#9204)](https://github.com/aws-amplify/amplify-js/issues/9204)
- [New Angular 15 Apps don't build due to TS error (#10775)](https://github.com/aws-amplify/amplify-js/issues/10775)

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

<img src="https://user-images.githubusercontent.com/70438514/222809595-1181fe84-f375-4d30-a866-c654b1c97024.gif" width="450" alt="custom-hub-v5">

**Proposed Usage (v6)**

```Typescript
// Each key in the map represents a payload event and the key value is the data type for that event.
// Note: If an event is assigned the void type, the payload object will not contain a data key.
type CustomEventDataMap = {
  A: number;
  B: string;
  C: void;
  D: object;
};

type CustomChannelMap = {
  channel: 'custom_channel';
  eventDataMap: CustomEventDataMap;
};

Hub.dispatch<CustomChannelMap>('custom_channel', { event: 'A', data: 1 });
Hub.listen<CustomChannelMap>('custom_channel', ({ payload }) => {
  switch (payload.event) {
    case 'A':
      payload.data;
      break;
    case 'B':
      payload.data;
      break;
    case 'C':
      // Type C doesn't have any associated event data
      // @ts-expect-error
      data = payload.data;
      break;
    case 'D':
      payload.data;
      break;
  }
});
```

<img src="https://user-images.githubusercontent.com/70438514/225745517-d9436a7c-329e-4ed9-b88b-823b92406cc4.gif" width="600" alt="custom-hub-v6">

Related issue: [Fully typed hubs (#5997)](https://github.com/aws-amplify/amplify-js/issues/5997)

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

![configure-v6](https://user-images.githubusercontent.com/70438514/222813249-f2782358-27c5-4d16-b5d4-9f4fd6d1b594.gif)

Related issue:
[A suggestion regarding typings for the Amplify.configure() function (#5095)](https://github.com/aws-amplify/amplify-js/issues/5095)

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

![signup-v5](https://user-images.githubusercontent.com/70438514/222456624-b4af7349-db9d-4304-9cdc-08cf649e2d31.png)

**Proposed Usage (v6)**

```Typescript
Auth.signUp({
  username: "username",
  password: "*******",
  options: {
    userAttributes: {
      email: "email@domain.com",
    },
  },
});
```

<img width="385" alt="user attributes" src="https://user-images.githubusercontent.com/70438514/225924992-d578c486-9775-4ce4-a5e7-718388f7d56b.png">

Related issue: [TypeScript definition not matching: Property 'attributes' does not exist on type 'CognitoUser' (#9941)](https://github.com/aws-amplify/amplify-js/issues/9941)

## Predictable API responses

We are improving **_DX_** by providing descriptive API responses to help developers complete auth flows. An example for the `confirmSignUp` API is highlighted below.

**Current Usage (v5)**

```Typescript
const resp = await Auth.confirmSignUp('username', '112233')

if (resp === 'SUCCESS'){
  // Show login component
}
```

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

<img src="https://user-images.githubusercontent.com/70438514/222456623-34d48988-5e3d-43be-bc9a-7c6d8ecb0b00.png" width="650" alt="confirmSignUp-v6">

Related issues:
- [Update types for Promises on Auth calls (#9286)](https://github.com/aws-amplify/amplify-js/issues/9286)
- [authenticator: add key types to user session payload (#10142)](https://github.com/aws-amplify/amplify-js/issues/10142)
- [Return types of functions in AuthClass are unsafe (#6053)](https://github.com/aws-amplify/amplify-js/issues/6053)

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
// New reference types (full types available in the sandbox)
type StorageObjectMetadata = {
  readonly size?: number;
  readonly eTag?: string;
  readonly lastModified?: Date;
};

type StorageObjectReference = {
  readonly key: string;
  readonly metadata?: StorageObjectMetadata;
} & AccessLevelConfig;

type StoragePathReference = {
  readonly path: string;
} & AccessLevelConfig;

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

# GraphQL `API` Category Changes

Amplify is proposing the following changes for the GraphQL `API` category to improve type safety and readability.

## Introduce dedicated, type-safe `query()`, `mutation()`, and `subscription()` GraphQL operation APIs

To better capture customer intent and simplify API types we will introduce dedicated APIs for queries, mutations, and subscriptions. We're going to retain the `graphql()` operation in case you want to issue multiple queries/mutations in a single request.

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
  variables: {
    filter: {
      id: number;
    };
  };
  result: {
    listTodos: {
      items: {
        id: number;
        name: string;
        description: string;
      }[];
    };
  };
};

const result = await API.query<MyQueryType>('query lisTodos...', {
  filter: { id: 123 },
});

console.log(`Todo : ${result.listTodos[0].name})`);

type MyMutationType = {
  variables: {
    input: {
      id: number;
      name: string;
      description: string;
    };
  };
  result: {
    createTodo: {
      id: number;
      name: string;
      description: string;
    };
  };
};

const result = await API.mutate<MyMutationType>('mutation createTodo....', {
  input: {
    id: 123,
    name: 'My Todo',
    description: 'This is a todo',
  },
});

console.log(`Todo : ${result.createTodo.id} ${result.createTodo.name} ${result.createTodo.description})`);

type MySubscriptionType = {
  variables: {
    filter: {
      name: {
        eq: string;
      };
    };
  };
  result: {
    createTodo: {
      id: number;
      name: string;
      description: string;
    };
  };
};

API.subscribe<MySubscriptionType>('subscription OnCreateTodo...', {
  filter: {
    name: { eq: 'awesome things' },
  },
}).on({
  next: (result) => console.log(`Todo info: ${result.createTodo.name})`),
});
```

## Less verbose type definitions for generated queries, mutations, and subscriptions
In v6, we want to reduce the verbosity of the typings for the code-generated queries, mutations, and subscriptions by inferring their types from the generated code.

**Current Usage (v5)**
```ts
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import { createTodo } from './graphql/mutations';
import { onCreateTodo } from './graphql/subscriptions';
import {
  CreateTodoInput,
  CreateTodoMutation,
  OnCreateTodoSubscription,
} from './API';
// so many imports from disparate modules 

function createMutation() {
  const createInput: CreateTodoInput = {
    name: 'Improve API TS support',
  };

  // Verbose explicit type definition when the information could be available in `createTodo`'s type
  const res = await API.graphql<GraphQLQuery<CreateTodoMutation>>(
    graphqlOperation(createTodo, {
      input: createInput,
    })
  );

  // the returned data is nested 2 levels deep and could be upleveled when the GraphQL document
  // only includes one query or mutation
  const newTodo = res.data?.createTodo;
}

function subscribeToCreate() {
  const sub = API.graphql<GraphQLSubscription<OnCreateTodoSubscription>>(
    graphqlOperation(onCreateTodo)
  ).subscribe({
    next: (message) => {
      // once again, we could "sift up" the return value instead of providing it in two levels of depth
      const newTodo = message.value?.data?.onCreateTodo;
    }
  });
}
```

**Proposed Usage (v6)**
```ts
import { API } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import { onCreateTodo } from './graphql/subscriptions';
import { CreateTodoInput } from './API';
// so many imports from disparate modules 

function createMutation() {
  const createInput: CreateTodoInput = {
    name: 'Improve API TS support ',
  };

  const res = await API.mutate(createTodo, {
    input: createInput,
  });

  // The returned data is the result of the request. If there are more than one queries/mutations in a request,
  // then the return value stays the same as v5. i.e. res.createTodo.data
  const newTodo = res;
}

function subscribeToCreate() {
  const sub = API.subscribe(onCreateTodo).on({
    next: (message) => {
      // Return value shortened slightly from `message?.data?.onCreateTodo`.
      next: (message) => {
        console.log(message.onCreateTodo);
      },
    }
  });
}
```

## Flatten GraphQL operation responses
As alluded to in the previous section, we're looking to flatten the results of GraphQL operations to make them more easily accessible instead of the current three-levels-deep nested object. Would love to get your understanding on which option you prefer.

**Current Usage (v5)**
```ts
async function createNewTodo() {
  const res: GraphQLResult<Todo> = await API.graphql<GraphQLQuery<Todo>>(
    graphqlOperation(createTodo, {
      input: { id: uuid() },
    })
  );

  // Mutation result is nested
  console.log(res.data.createTodo); 
}
```

### Proposed behavior for single query/mutation in the response
**Proposed Option 1: Flatten to the lowest level (v6)**
```ts
async function createNewTodo() {
  const res: Todo = await API.mutate(createTodo, {
    input: { id: uuid() },
  });
  
  // Response flattened to the todo level
  console.log(res); 
}
```

**Proposed Option 2: Flatten to the `data` level (v6)**
```ts
async function createNewTodo() {
  const res = await API.mutate(createTodo, {
    input: { id: uuid() },
  });

  // Response flattened to the `data` level
  console.log(res.createTodo); 
}

interface GraphQLData<T = object> {
  [query: string]: T // in the above example T is Todo
}
```

### Proposed behavior for multiple queries/mutations in the response
In GraphQL, you can define multiple queries or mutations in a single request via the `.graphql()` operation. The response object will include the result of all the queries and mutations. For example, given the following queries:

```ts
async function custom() {

  type MyMultiQueryType = {
    variables: {
      input: {
        todoId: string;
        fooId: string;
      };
    };
    result: {
      getTodo: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      };
      getFoo: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      };
    };
  };

  const operation = {
    query: `
      query GetTodo($todoId: ID!, $fooId: ID!) {
        getTodo(id: $todoId) {
          id
          name
          createdAt
          updatedAt
        }
        getFoo(id: $fooId) {
          id
          name
          createdAt
          updatedAt
        }
      }
    `,
    variables: { todoId: 'c48481bd-f808-426f-8fed-19e1368ca0bc', fooId: '9d4e6e30-fcb4-4409-8160-7d44931a6a02' },
    authToken: undefined,
    userAgentSuffix: undefined
  }
  
  const result = await API.graphql<MyMultiQueryType>(operation.query, {
    variables: operation.variables
  });
}
```

**Proposed Option 1: Flatten to data level**
```ts
  console.log(res.getTodo);
  console.log(res.getFoo);
```

**Proposed Option 2: Flatten to the array level**
```ts
  // retains the ordering of the queries in the graphql request
  console.log(res[0]); // todo
  console.log(res[1]); // foo
```

**Proposed Option 3: Don't flatten at all** 
```ts
  console.log(res.data.getTodo);
  console.log(res.data.getFoo);
```

## Type safety for GraphQL query, mutation, subscription inputs

In v6, we want to ensure type safety on GraphQL inputs if you use one of the generated GraphQL queries, mutations, or subscriptions.

**Current Usage (v5)**
```ts
import { updateTodo } from './graphql/mutations';
import { CreateTodoInput } from './API';

const createInput: CreateTodoInput = {
  name: todoName,
  description,
};

const res = await API.graphql<GraphQLQuery<UpdateTodoMutation>>(
  graphqlOperation(updateTodo, {
    // passing an object of type CreateTodoInput (that's missing
    // a required field for updates `id`) into an update mutation's input
    // does not surface a type error. This will only throw a runtime error after
    // the mutation request gets rejected by AppSync
    input: createInput,
  })
);
```

**Proposed Usage (v6)**
```ts
import { updateTodo } from './graphql/mutations';
import { CreateTodoInput } from './API';

const createInput: CreateTodoInput = {
  name: todoName,
  description,
};

const res = await API.mutate(updateTodo, {
    // @ts-expect-error
    input: createInput, // `input` must be of type `UpdateTodoInput`
});
```

## [Bug fix: Add `__typename` to GraphQL operations' selection set](https://github.com/aws-amplify/amplify-codegen/issues/445)

Currently there's a bug in which the generated API types contain `__typenames` but not in the selection set of the generated GraphQL operations. This causes runtime type checking errors when you rely on TypeScript to expect the "__typename" field to be present but it isn't. Prior to the v6 launch, we'll fix this bug to ensure the type definition matches the selection set/return value of the GraphQL operation during runtime.

## [Bug fix: Remove `any` cast needed for subscriptions](https://github.com/aws-amplify/amplify-js/issues/7589#issuecomment-1258596131)

In v5, there's a type mismatch bug for GraphQL subscriptions that forces the developer to cast to `any` to subscribe or unsubscribe. We plan on fixing this for v6.

**Current Usage (v5)**
```ts
import { onCreateUser } from './graphql/subscriptions'

const subscription.value = (API.graphql(graphqlOperation(
  onCreateUser,
  { id: userId }
)) as any).subscribe({ next: onSubscribe })

(subscription.value as any).unsubscribe()
```

**Proposed Usage (v6)**
```ts
import { onCreateUser } from './graphql/subscriptions'

const subscription = API.subscribe(
  onCreateUser,
  { id: userId }
).on({ next: onSubscribe })
// . . .
subscription.unsubscribe()
```


# REST `API` Category Changes

Amplify is proposing the following changes for the REST `API` category.

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
    apiName: "MyApi",
    path: "/items",
    authMode: "AWS_IAM",
  },
  {
    headers: {
      "custom-header": "x",
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
  apiName: "MyApi",
  path: "/getName",
});

console.log(`The name is ${result.body.firstName} ${result.body.lastName}`);

const result = await API.put<string, { data: Array<number> }>(
  {
    apiName: "",
    path: "/",
    authMode: "API_KEY",
  },
  {
    headers: {
      "Content-type": "text/plain",
    },
    body: "this is my content",
  }
);

result.body.data.forEach((value) => console.log(value));
```

## Type narrowing on runtime errors

**Current Usage (v5)**

Amplify v5 does not support narrowing down errors.

**Proposed Usage (v6)**

```typescript
try {
  await API.get({
    apiName: "myApi",
    path: "/",
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
