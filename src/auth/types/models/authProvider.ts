export type CustomAuthProvider = { custom: string }

export type AuthProvider =
  | "GOOGLE"
  | "FACEBOOK"
  | "AMAZON"
  | "COGNITO"
  | CustomAuthProvider
