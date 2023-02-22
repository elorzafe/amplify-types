export type SetupSoftwareTokenResult = {
    secretCode: string;
    getQRCodeLinkGenerator: (appName:string)=>string
}

