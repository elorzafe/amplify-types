export const enum AuthSignInStep {
  CONFIRM_SIGN_IN_WITH_SMS_MFA_CODE = "CONFIRM_SIGN_IN_SMS_MFA_CODE",

  CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE = "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE",

  CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED = "NEW_PASSWORD_REQUIRED",

  CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE = "CONFIRM_SIGN_IN_WITH_SOFTWARE_TOKEN_MFA_CODE",

  SELECT_MFA_TYPE = "SELECT_MFA_TYPE",

  CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",

  RESET_PASSWORD = "RESET_PASSWORD",

  DONE = "DONE",
}
