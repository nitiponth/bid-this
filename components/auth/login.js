import { Fragment, useContext, useState } from "react";
import { Form, Field, Formik } from "formik";
import AuthContext from "../../store/auth-context";
import LayoutContext from "../../store/layout-context";
import BConfirm from "../atoms/BConfirm/BConfirm";
import Image from "next/image";

function Login() {
  const [errorModal, setErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const layoutCtx = useContext(LayoutContext);
  const authCtx = useContext(AuthContext);

  const onCloseHandler = () => {
    layoutCtx.setModalType(null);
  };

  const onSignupHandler = () => {
    layoutCtx.setModalType("register");
  };

  const onLoginHander = async ({ email, password }) => {
    const result = await authCtx.login(email, password);
    if (result.status) {
      layoutCtx.setModalType(null);
    } else if (!result.status) {
      setErrorModal(true);
      setErrorMsg(result.data);
    }
  };

  const closeModalHandler = () => {
    setErrorModal(false);
    setErrorMsg("");
  };

  return (
    <div className="auth__layout">
      <BConfirm
        body={errorMsg}
        active={errorModal}
        confirmOnly={true}
        onClose={closeModalHandler}
        confirmText={"Ok"}
        onConfirm={closeModalHandler}
        title={"An error occurred"}
      />
      <div className="login">
        <div className="close-btn" onClick={onCloseHandler}>
          <Image
            src="/images/SVG/cross.svg"
            alt="clost button"
            width={30}
            height={30}
            className="btn__close-img"
          />
        </div>
        <div className="login__logo">
          <div className="login__logo-box">
            <Image
              src="/images/logo-square.png"
              alt="logo"
              width={105}
              height={105}
              className="login__logo-img"
            />
          </div>
          <h1 className="login__logo-text">Welcome</h1>
        </div>

        <div className="login__content">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={onLoginHander}
          >
            <Form className="login__form">
              <label htmlFor="email" className="login__form--text">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className="login__form-input"
              />
              <label htmlFor="password" className="login__form--text">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="login__form-input"
              />
              {/* <a href="#" className="login__link login__link--forgot">
                Forgot password?
              </a> */}

              <button type="submit" className="login__btn">
                Login
              </button>
            </Form>
          </Formik>
        </div>
        <div className="login__footer">
          Don&apos;t have an account?
          <a
            href="#"
            className="login__link login__link--sign footer login__footer--link"
            onClick={onSignupHandler}
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
