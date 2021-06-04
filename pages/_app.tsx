import React from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

import NavBar from "~/components/nav-bar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  const authRoutes = ["login", "register"];
  const isAuthRoute = authRoutes.includes(pathname);

  return (
    <React.Fragment>
      {isAuthRoute && <NavBar />}
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default MyApp;
