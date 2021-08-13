import Head from "next/head";
import { Fragment, useState } from "react";
import AuthLayout from "../components/auth/auth";
import Backdrop from "../components/layout/backdrop";
import Layout from "../components/layout/layout";
import BidItem from "../components/pages/bid/bid-item";
import MainContent from "../components/pages/main-content/main-content";

export default function Home() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [authLayout, setAuthLayout] = useState();
  const [bidLayout, setBidLayout] = useState();
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
      <Backdrop show={showBackdrop}>
        {authLayout && <AuthLayout layout={authLayout} />}
        {bidLayout && <BidItem />}
      </Backdrop>
      <Layout>
        <MainContent />
      </Layout>
    </Fragment>
  );
}
