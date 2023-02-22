import { ConfirmSoftwareTokenRequest } from "../../types/request"
import { SetupSoftwareTokenResult } from "../../types/result"

export type TOTPNamespace = {
    readonly setup :  ()=>Promise<SetupSoftwareTokenResult>
    readonly confirmSoftwareToken: (req: ConfirmSoftwareTokenRequest)=>Promise<void>
    authenticatorLink: (appName: String, secretCode: string) =>string
}