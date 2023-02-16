import { Auth, AuthSignInStep } from './../src/auth';
import { Amplify } from '../src/core';
Amplify.configure({
    Auth: {
        userPoolId: "adsasd",
        userPoolClientId: "",
    }
});

async function testSignIn() {

    const result = await Auth.signIn({
        username: 'asdas',
        password: 'asdasda',
        metadata: {
            a: 'asd'
        },
        validationData: {
            b: 'asd'
        }
    });

    if (!result.isSignedIn) {
        if (result.nextStep.signInStep === AuthSignInStep.)
    }
}
