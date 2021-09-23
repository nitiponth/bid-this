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
  const [showBackdrop, setShowBackdrop] = useState(false);
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
      <Backdrop show={showBackdrop}>{bidLayout && <BidItem />}</Backdrop>
      <Layout>
        <ClientOnly>
          <MainContent />
        </ClientOnly>
      </Layout>
    </Fragment>
  );
}

export const getStaticProps = async (ctx) => {
  const { data } = await client.query({
    query: gql`
      query {
        getProducts {
          id
          title
          desc
          end
          price {
            initial
            current
          }
          seller {
            username
          }
        }
      }
    `,
  });

  const products = data.getProducts
    .filter((product) => product.end > new Date().toLocaleString("en-US"))
    .map((product) => {
      return {
        title: product.title,
        img: "/images/items/model5.jpg",
        desc: product.desc,
        price: product.price.initial,
        lastPrice: product.price.current,
        endTime: product.end,
        seller: product.seller.username,
      };
    });

  return {
    props: {
      products: products,
    },
  };
};
