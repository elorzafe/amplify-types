# RFC: Amplify JS TypeScript Improvements

# Introduction of Functional APIs
# General TypeScript Improvements
- Version upgrade
- Strict mode

# Auth category changes

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
# Storage category changes
=======
# Utility Changes
- Hub typing
- Configuration

# `Auth` Changes
# `Storage` Changes
Amplify is proposing the following changes for the `Storage` category.

- Introduction of `StorageObjectReference`
  - Highlight interoperability between APIs
  - Examples of usage compared with current model
- Updated pattern for resumable uploads via `upload`
  - Removed status callbacks in favor of `Promise` result
## Introduction of `StorageObjectReference`

# API category changes
=======
## Splitting up `get` API
## Changes to `upload` Return Object

Try out the new types here: TODO Playground Link
# `API` & `Datastore` Changes

Try out the new types here: TODO Playground Link