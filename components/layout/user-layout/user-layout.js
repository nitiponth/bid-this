import MainHeader from "../main-header";

function UserLayout(props) {
  return (
    <div className="user-container">
      <div className="user-container__header">
        <MainHeader />
      </div>
      <div className="user-container__content">{props.children}</div>
    </div>
  );
}

export default UserLayout;
