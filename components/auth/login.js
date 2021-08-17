import { useContext } from "react";
import LayoutContext from "../../store/layout-context";

function Login() {
  const layoutCtx = useContext(LayoutContext);

  const onCloseHandler = () => {
    layoutCtx.setAuth(false);
    layoutCtx.setType(null);
  };

  const onSignupHandler = () => {
    layoutCtx.setType("register");
  };

  return (
    <div className="login">
      <div className="close-btn" onClick={onCloseHandler}>
        <img
          src="/images/SVG/cross.svg"
          alt="clost button"
          className="btn__close-img"
        />
      </div>
      <div className="login__logo">
        <div className="login__logo-box">
          <img
            src="/images/logo-square.png"
            alt="logo"
            className="login__logo-img"
          />
        </div>
        <h1 className="login__logo-text">Welcome</h1>
      </div>

      <div className="login__content">
        <form className="login__form">
          <label htmlFor="email" className="login__form--text">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className="login__form-input"
          />
          <label htmlFor="password" className="login__form--text">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="login__form-input"
          />
          <a href="#" className="login__link login__link--forgot">
            Forgot password?
          </a>

          <button type="submit" className="login__btn">
            Login
          </button>
        </form>
      </div>
      <div className="login__footer">
        Don't have an account?
        <a
          href="#"
          className="login__link login__link--sign footer login__footer--link"
          onClick={onSignupHandler}
        >
          Sign up
        </a>
      </div>
    </div>
  );
}

export default Login;
