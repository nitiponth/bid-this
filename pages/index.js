import Head from "next/head";
import { Fragment, useState } from "react";
import AuthLayout from "../components/auth/auth";
import Backdrop from "../components/layout/backdrop";
import Layout from "../components/layout/layout";

export default function Home() {
  const [show, setShow] = useState(false);
  const [authLayout, setAuthLayout] = useState();
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
      <Backdrop show={show}>
        <AuthLayout layout={authLayout} />
      </Backdrop>
      <Layout />
    </Fragment>
  );
}
