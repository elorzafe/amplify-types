import { Auth, AuthSignInStep } from './../src/auth';
import { Storage } from './../src/storage';
import { Amplify } from '../src/core';


Amplify.configure({
    Auth: {
        userPoolId: "adsasd",
        userPoolClientId: "",
    }
});

var test = Auth.signIn({username: "jjj",})



