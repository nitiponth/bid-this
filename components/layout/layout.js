import MainHeader from "./main-header";
import Sidebar from "./sidebar";

function Layout(props) {
  return (
    <div className="container">
      <div className="container__header">
        <MainHeader />
      </div>
      <div className="container__sidebar">
        <Sidebar />
      </div>
      <div className="container__content">{props.children}</div>
    </div>
  );
}

export default Layout;
