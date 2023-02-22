import { AuthUserAttributeKey } from "./authUserAttributeKey";
import { DeliveryMedium } from "./deliveryMedium";

export type AuthCodeDeliveryDetails<
  UserAttributeKey extends AuthUserAttributeKey = AuthUserAttributeKey
> = {
  destination: string;
  deliveryMedium: DeliveryMedium;
  attributeName?: UserAttributeKey;
};
