import { useState, useEffect, useCallback } from "react";
let logOutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const loginHandler = useCallback((userId, token, tokenExpiration) => {
    setToken(token);
    const tokenExpirationDate =
      tokenExpiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(userId);
  }, []);

  const logoutHandler = useCallback(() => {
    setToken(null);
    // Once the user is logged out, we must remove the expiration date from the state so that
    // we consider the next login as a fresh new login.
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    setUserId(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      loginHandler(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [loginHandler]);

  useEffect(() => {
    // Triggers logout once 1 hour is complete since logged in due to expiration of tokens set in the server.
    /**
     * If the tokens and expirationdate is available, that means the user logged in or got auto logged in
     * due to the valid jwt tokens in localStorage as per expiration.
     * If they (tokens and expirationDate) are not available, that means the user manually logged out,
     * hence, we must clear the timer so that it doesn't attempt to logout post user logged out.
     */
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logOutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, logoutHandler, tokenExpirationDate]);

  return { token, userId, loginHandler, logoutHandler };
};
