import { AuthDevice } from "../../../types/authDevice";
import { AuthAttributeType } from "../../../types/models/authAttributeType";

export interface AWSAuthDevice extends AuthDevice {
  attributes: AuthAttributeType;
  createDate?: Date;
  lastAuthenticatedDate?: Date;
  lastModifiedDate?: Date;
}
