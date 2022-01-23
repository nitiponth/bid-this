import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import Image from "next/image";
import { useContext, useState } from "react";
import LayoutContext from "../../store/layout-context";

const SIGNUP_MUTATION = gql`
  mutation (
    $singupEmail: String!
    $singupFirst: String!
    $singupLast: String!
    $singupPassword: String!
    $singupUsername: String!
    $singupPhone: String!
    $singupAddress: String!
    $singupProvince: String!
    $singupPostcode: String!
  ) {
    singup(
      email: $singupEmail
      first: $singupFirst
      last: $singupLast
      password: $singupPassword
      username: $singupUsername
      phone: $singupPhone
      address: $singupAddress
      province: $singupProvince
      postcode: $singupPostcode
    )
  }
`;

function Register() {
  const layoutCtx = useContext(LayoutContext);
  const [hasError, setHasError] = useState();

  const [signup] = useMutation(SIGNUP_MUTATION);

  const onCloseHandler = () => {
    layoutCtx.setModalType(null);
  };

  const onSigninHandler = () => {
    layoutCtx.setModalType("login");
  };

  const initialValues = {
    email: "",
    password: "",
    rePassword: "",
    username: "",
    name: "",
    lastname: "",
    address: "",
    province: "",
    postcode: "",
    phone: "",
    accept: false,
  };

  const validate = (values) => {
    setHasError();
    let errors = {};
    if (values.password !== values.rePassword) {
      errors.rePassword = "Password field must be the same";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    try {
      console.log("signing...");
      const { data } = await signup({
        variables: {
          singupEmail: values.email,
          singupFirst: values.name,
          singupLast: values.lastname,
          singupPassword: values.password,
          singupUsername: values.username,
          singupPhone: values.phone,
          singupAddress: values.address,
          singupProvince: values.province,
          singupPostcode: values.postcode,
        },
      });
      if (data) {
        layoutCtx.setModalType(null);
      }
    } catch (e) {
      setHasError(e.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
  });

  let submitClassname = "register__btn register__btn--disabled";
  if (formik.values.accept) {
    submitClassname = "register__btn";
  }

  return (
    <div className="auth__layout">
      <div className="register">
        <div className="close-btn" onClick={onCloseHandler}>
          <Image
            src="/images/SVG/cross.svg"
            alt="clost button"
            width={30}
            height={30}
            className="btn__close-img"
          />
        </div>

        <div className="register__logo">
          <div className="register__logo-box">
            <Image
              src="/images/logo-land.png"
              alt="logo"
              width={150}
              height={80}
              objectFit="cover"
              className="register__logo-img"
            />
          </div>
          <h1 className="register__logo-text">Register</h1>
        </div>
        <div className="register__content">
          {hasError && <div className="register__errors">{hasError}</div>}
          <form className="register__form" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="register__form--text">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email Address"
              className="register__form-input"
            />
            <label htmlFor="password" className="register__form--text">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className="register__form-input"
            />
            <label htmlFor="re-password" className="register__form--text">
              Re-Password{" "}
              {formik.errors.rePassword && (
                <span style={{ color: "salmon" }}>
                  ({formik.errors.rePassword})
                </span>
              )}
            </label>
            <input
              id="re-password"
              name="rePassword"
              type="password"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              placeholder="Re-Password"
              className="register__form-input"
            />

            <label htmlFor="username" className="register__form--text">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Username"
              className="register__form-input"
            />

            <div className="register__form--twocol">
              <div className="register__form--twocol-col">
                <label htmlFor="name" className="register__form--text">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Firstname"
                  className="register__form-input"
                />
              </div>

              <div className="register__form--twocol-col">
                <label htmlFor="name" className="register__form--text">
                  Lastname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  placeholder="Lastname"
                  className="register__form-input"
                />
              </div>
            </div>

            <label htmlFor="address" className="register__form--text">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.address}
              placeholder="Address"
              className="register__form-input"
            />
            <div className="register__form--twocol">
              <div className="register__form--twocol-col">
                <input
                  id="province"
                  name="province"
                  type="text"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.province}
                  placeholder="Province"
                  className="register__form-input"
                />
              </div>

              <div className="register__form--twocol-col">
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.postcode}
                  placeholder="Postcode"
                  className="register__form-input"
                  minLength="5"
                  maxLength="5"
                />
              </div>
            </div>

            <label htmlFor="Phone" className="register__form--text">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
              required={true}
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Phone Number"
              className="register__form-input"
            />
            <div className="register__term">
              <input
                type="checkbox"
                id="accept"
                name="accept"
                onChange={formik.handleChange}
                value={formik.values.accept}
                className="register__term-checkbox"
              />
              <label htmlFor="accept" className="register__term-text">
                I agree to BidThis's
                <a href="#" className="register__link register__link--sign">
                  Terms of Use
                </a>
                and
                <a href="#" className="register__link register__link--sign">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className={submitClassname}
              disabled={!formik.values.accept}
            >
              Register
            </button>
          </form>
        </div>
        <div className="register__footer">
          Already have an account?
          <a
            href="#"
            className="register__link register__link--sign"
            onClick={onSigninHandler}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
