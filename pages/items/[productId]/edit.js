import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import NoSideLayout from "../../../components/layout/no-sidebar-layout/no-sidebar-layout";
import EditItem from "../../../components/pages/single_item/edit-item";
function EditProduct() {
  const router = useRouter();
  const { productId } = router.query;
  return (
    <Fragment>
      <Head>
        <title>Loading product info...</title>
        <meta name="description" content="Wait a sec, it's almost done!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSideLayout height={"minheight"}>
        <EditItem prodId={productId} />
      </NoSideLayout>
    </Fragment>
  );
}

export default EditProduct;
