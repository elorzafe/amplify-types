import { Storage } from "../src/storage";
import { Amplify } from "../src/core";

Amplify.configure({
  Auth: {
    userPoolId: "adsasd",
    userPoolClientId: "",
  },
});

const uploadTask = Storage.uploadFile({
  name: "tesds",
  uploadObject: "dsadsaads",
  level: "private",
  uploadLocation: "",
  progressIndicator(progress) {
    var testing = progress - 1;
  },
  metadata: {
    value1: "test",
    value2: "!2312312",
  },
  serverSideEncryptionOptions: {
    SSEKMSKeyId: "as132",
  },
  resumable: false,
});
