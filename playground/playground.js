"use strict";
exports.__esModule = true;
var src_1 = require("../src");
src_1.Amplify.configure({
    Auth: {
        userPoolClientId: 'asda',
        identityPoolId: 'asads'
    }
});
var authConfig = {
    userPoolId: 'asdads',
    identityPoolId: 'asdasdasd'
};
src_1.Amplify.configure({
    Auth: authConfig
});
