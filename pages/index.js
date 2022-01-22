import Cookies from "js-cookie";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import BVerify from "../components/organisms/BVerify/bVerify";
import MainContent from "../components/pages/main-content/main-content";
import AuthContext from "../store/auth-context";

export default function Home(props) {
  const [activeVerifyModal, setActiveVerifyModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const { user } = authCtx;

  useEffect(() => {
    const isShown = Cookies.get("verifyPopup");
    if (user?.status === "GUEST" && !isShown) {
      Cookies.set("verifyPopup", true);
      setTimeout(() => {
        setActiveVerifyModal(true);
      }, 1000);
    }
  }, [user]);

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
        <BVerify
          active={activeVerifyModal}
          onClose={() => setActiveVerifyModal(false)}
        />
        <MainContent />
      </Layout>
    </Fragment>
  );
}
