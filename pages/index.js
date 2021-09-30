import Head from "next/head";
import { Fragment, useState } from "react";
import { gql } from "@apollo/client";

import client from "../apollo-client";

import Backdrop from "../components/layout/backdrop";
import Layout from "../components/layout/layout";
import BidItem from "../components/pages/bid/bid-item";
import MainContent from "../components/pages/main-content/main-content";
import ClientOnly from "../components/ClientOnly";

export default function Home(props) {
  // const [showBackdrop, setShowBackdrop] = useState(false);
  // const [bidLayout, setBidLayout] = useState();

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
      {/* <Backdrop show={showBackdrop}>{bidLayout && <BidItem />}</Backdrop> */}
      <Layout>
        <MainContent />
      </Layout>
    </Fragment>
  );
}
