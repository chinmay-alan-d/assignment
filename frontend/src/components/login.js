import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button style={{ backgroundColor : "transparent", border : "None", color : "#1f84fc" }} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;