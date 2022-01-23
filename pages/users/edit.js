import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import BLoading from "../../components/molecules/BLoading/BLoading";
import EditProfile from "../../components/pages/profile/edit-profile";

import AuthContext from "../../store/auth-context";

function EditPages() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (!authCtx.isLogin) {
      router.push("/");
    } else {
      setIsLoad(false);
    }
  });

  if (isLoad) {
    return (
      <Fragment>
        <Head>
          <title>Loading your profile...</title>
          <meta name="description" content="Wait a sec, it's almost done!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NoSideLayout height={"minheight"}>
          <BLoading />
        </NoSideLayout>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Edit Personal Information</title>
        <meta
          name="description"
          content="Improve your profile for reliable web application usage."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSideLayout height={"minheight"}>
        <EditProfile />
      </NoSideLayout>
    </Fragment>
  );
}

export default EditPages;
