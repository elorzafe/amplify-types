import { AuthProvider } from "../../../types/models/authProvider"
import { FederateToIdentityPoolOptions } from "../options/federateToIdentityPoolOptions"

export type FederateToIdentityPoolRequest = {
  providerToken:string,
  authProvider: AuthProvider
  options?: FederateToIdentityPoolOptions
}