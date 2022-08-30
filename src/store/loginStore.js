import React from "react";

const LoginStore = React.createContext({
  isLoggedIn: false,
  loginUser: '',
  setLoginState: () => {},
  setUserState: () => {},
})

export default LoginStore;