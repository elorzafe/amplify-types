/**
 * Attribute ref - {@link https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html}
 */
export type AuthStandardAtributeKey =
  | "address"
  | "birthDate"
  | "email"
  | "emailVerified"
  | "familyName"
  | "gender"
  | "givenName"
  | "locale"
  | "middleName"
  | "name"
  | "nickname"
  | "phoneNumber"
  | "phoneNumberVerified"
  | "picture"
  | "preferredUsername"
  | "profile"
  | "sub"
  | "updatedAt"
  | "website"
  | "zoneInfo";

type AnyAttribute = {}&string

export type AuthUserAttributeKey =
  | AuthStandardAtributeKey
  | AnyAttribute

