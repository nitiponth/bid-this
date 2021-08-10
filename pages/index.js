import Head from "next/head";
import { Fragment, useState } from "react";
import AuthLayout from "../components/auth/auth";
import Backdrop from "../components/layout/backdrop";
import Layout from "../components/layout/layout";
import BidItem from "../components/pages/bid/bid-item";
import MainContent from "../components/pages/main-content/main-content";
import SingleItem from "../components/pages/single_item/single_item";

export default function Home() {
  const [show, setShow] = useState(true);
  const [authLayout, setAuthLayout] = useState();
  const [bidLayout, setBidLayout] = useState(true);
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
        {authLayout && <AuthLayout layout={authLayout} />}
        {bidLayout && <BidItem />}
      </Backdrop>
      <Layout>
        {/* <MainContent /> */}
        <SingleItem />
      </Layout>
    </Fragment>
  );
}
