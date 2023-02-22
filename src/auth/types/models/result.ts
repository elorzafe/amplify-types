import { AuthError } from "../../authError"

export type ResultValue<T> = { value: T };
export type ResultError = { error: AuthError };
export type Result<T> = ResultValue<T> | ResultError;