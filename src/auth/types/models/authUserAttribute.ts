import { AuthUserAttributeKey } from "./authUserAttributeKey";

export type AuthUserAttribute<UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey> = {
  userAttributeKey: UserAttributeKey;
  value: string;
};
