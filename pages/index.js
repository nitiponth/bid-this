import Head from "next/head";
import { Fragment } from "react";
import Login from "../components/auth/login";
import Backdrop from "../components/layout/backdrop";
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Bid This</title>
        <meta
          name="description"
          content="Buy the product at the price you choose."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Backdrop>
        <Login />
      </Backdrop>
      <Layout />
    </Fragment>
  );
}
