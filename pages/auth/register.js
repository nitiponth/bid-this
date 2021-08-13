import { Fragment } from "react";
import AuthLayout from "../../components/auth/auth";
import Backdrop from "../../components/layout/backdrop";
import Layout from "../../components/layout/layout";
import MainContent from "../../components/pages/main-content/main-content";

function Register() {
  return (
    <Fragment>
      <Backdrop show={true}>
        <AuthLayout layout="register" />
      </Backdrop>
      <Layout>
        <MainContent />
      </Layout>
    </Fragment>
  );
}

export default Register;
