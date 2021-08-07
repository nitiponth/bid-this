import Login from "./login";
import Register from "./register";

function AuthLayout(props) {
  return (
    <div className="auth__layout">
      {props.layout == "login" && <Login />}
      {props.layout == "register" && <Register />}
    </div>
  );
}

export default AuthLayout;
