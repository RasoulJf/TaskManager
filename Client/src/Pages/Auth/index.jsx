import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
const Auth = () => {
  const [pageType, setPageType] = useState("login");
  const handlePageType = () => {
    pageType == "login" ? setPageType("register") : setPageType("login");
  };

  return (
    <>
      {pageType == "login" ? (
        <Login handlePageType={handlePageType} />
      ) : (
        <Register handlePageType={handlePageType} />
      )}
    </>
  );
};

export default Auth;
