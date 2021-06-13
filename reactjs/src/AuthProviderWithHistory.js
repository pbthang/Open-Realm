import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const AuthProviderWithHistory = ({ children }) => {
  const domain = "dev-d1rzgdpx.jp.auth0.com";
  const clientId = "QOU1OyaL4Odw32gPc6rw69DkjXHvdnMA";

  const history = useHistory();

  // eslint-disable-next-line
  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
        // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProviderWithHistory;
