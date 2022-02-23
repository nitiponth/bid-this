import Head from "next/head";
import { Fragment } from "react";
import Layout from "../../components/layout/layout";
import Credits from "../../components/pages/credits/Credits";

function CreditsPage() {
  return (
    <Fragment>
      <Head>
        <title>Credits balance</title>
        <meta
          name="description"
          content="Buy the product at the price you choose."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Credits />
      </Layout>
    </Fragment>
  );
}

export default CreditsPage;
