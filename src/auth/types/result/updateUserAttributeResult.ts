import { AuthUserAttributeKey } from "../models/authUserAttributeKey";
import { AuthNextUpdateAttributeStep } from "../step/authNextUpdateAttributeStep";


export type UpdateUserAttributeResult<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  nextStep: AuthNextUpdateAttributeStep<UserAttributeKey>;
  isUpdated: boolean;
}
