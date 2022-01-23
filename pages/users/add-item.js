import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import BLoading from "../../components/molecules/BLoading/BLoading";
import AddProduct from "../../components/pages/profile/add-product";
import AuthContext from "../../store/auth-context";

function AddItem() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (!authCtx.isLogin || authCtx?.user?.status !== "FULLAUTHEN") {
      router.push("/");
    } else {
      setIsLoad(false);
    }
  });

  if (isLoad) {
    return <BLoading containerStyle={{ marginTop: "20rem" }} />;
  }

  return (
    <Fragment>
      <Head>
        <title>Add products to be auctioned</title>
        <meta
          name="description"
          content="There is no cost to place an item for auction through our application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSideLayout height={"minheight"}>
        <AddProduct />
      </NoSideLayout>
    </Fragment>
  );
}

export default AddItem;
