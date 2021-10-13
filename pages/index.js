import Head from "next/head";
import { Fragment, useState } from "react";
import Layout from "../components/layout/layout";
import MainContent from "../components/pages/main-content/main-content";

export default function Home(props) {
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
      <Layout>
        <MainContent />
      </Layout>
    </Fragment>
  );
}
