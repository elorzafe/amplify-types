export type CognitoSignInWithWebUIOptions = {
  /**
   * Android-only: The browser package name (application ID) to use to launch
   * the custom tab.
   */
  browserPackage?: string;

  /**
   *
   * iOS-only: Starts the webUI signin in a private browser session, if supported by the current browser.
   * Note that this value internally sets `prefersEphemeralWebBrowserSession` in ASWebAuthenticationSession.
   *
   *  As per Apple documentation, Whether the request is honored depends on the user’s default web browser.
   *
   * Safari always honors the request.
   */
  privateSession?: boolean;
};

