import { AuthStandardAtrributeKey } from "../../../types/models/authUserAttributeKey";

export type CustomAttribute = {custom:string}
export type CognitoUserAttributeKey =
| AuthStandardAtrributeKey
| CustomAttribute
