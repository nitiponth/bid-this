function AdminHeader() {
  return (
    <div className="admin__header">
      <div className="header__left">
        <div className="header__left__logoBox">
          <img
            src={"/images/logo-land.png"}
            alt="logo"
            className="header__left__logo"
          />
        </div>
      </div>
      <div className="header__right">
        <p className="header__right__username">adminTestId</p>
      </div>
    </div>
  );
}

export default AdminHeader;
