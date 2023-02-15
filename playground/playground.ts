import { Amplify } from '../src/core';

Amplify.configure({
    Auth: {
        userPoolId: "",
        identityPoolId: ""
    }
});