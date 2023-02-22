import { AuthMFAType } from "../models/authMFAType";

export type SetPreferredMFARequest<MFAType extends AuthMFAType = AuthMFAType> = {
    mfaType: MFAType 
};
export { AuthMFAType };

