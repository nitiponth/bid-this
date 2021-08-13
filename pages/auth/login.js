import { Fragment, useState } from "react";

import AuthLayout from "../../components/auth/auth";
import Backdrop from "../../components/layout/backdrop";
import Layout from "../../components/layout/layout";
import MainContent from "../../components/pages/main-content/main-content";

function Login() {
  const [showBackdrop, setShowBackdrop] = useState(true);
  return (
    <Fragment>
      <Backdrop show={showBackdrop}>
        <AuthLayout layout="login" />
      </Backdrop>
      <Layout>
        <MainContent />
      </Layout>
    </Fragment>
  );
}

export default Login;
