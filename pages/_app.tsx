import React from "react";
import App, { AppProps, AppContext } from "next/app";
import { useRouter } from "next/router";

import axios from "~/utils/axios";
import NavBar from "~/components/nav-bar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  const authRoutes = ["/login", "/register"];
  const isAuthRoute = authRoutes.includes(pathname);

  return (
    <React.Fragment>
      {!isAuthRoute && <NavBar />}
      <Component {...pageProps} />
    </React.Fragment>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { ctx } = context;
  if (ctx.req) {
    const token = ctx.req.headers.cookie.split("=")[1];
    axios.defaults.headers.common.Authorization = `Bearer ${
      token ? token : ""
    }`;
  }
  return { ...appProps };
};

export default MyApp;
