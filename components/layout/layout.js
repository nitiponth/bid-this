import MainHeader from "./main-header";
import Sidebar from "./sidebar";

function Layout() {
  return (
    <div className="container">
      <div className="container__header">
        <MainHeader />
      </div>
      <div className="container__sidebar">
        <Sidebar />
      </div>
      <div className="container__content"></div>
    </div>
  );
}

export default Layout;
