import { Storage } from '../src/storage';
import { Amplify } from '../src/core';

Amplify.configure({
    Auth: {
        userPoolId: "adsasd",
        userPoolClientId: "",
    }
});

Storage.put({Name : "tesds", uploadObject: "dsadsaads", level : "private", uploadLocation : ""})
