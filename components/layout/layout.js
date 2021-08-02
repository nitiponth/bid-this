import MainHeader from "./main-header";

function Layout() {
  return (
    <div className="container">
      <div className="container__header">
        <MainHeader />
      </div>
      <div className="container__sidebar">sidebar</div>
      <div className="container__content">content</div>
      <div className="container__footer">footer</div>
    </div>
  );
}

export default Layout;
