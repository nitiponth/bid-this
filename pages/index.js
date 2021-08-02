import Head from "next/head";
import { Fragment } from "react";
import Layout from "../components/layout/layout";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Banana Bid</title>
        <meta
          name="description"
          content="Buy the product at the price you choose."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </Fragment>
  );
}
