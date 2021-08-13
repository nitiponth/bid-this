import MainHeader from "../main-header";

function NoSideLayout(props) {
  return (
    <div className="ns-container">
      <div className="ns-container__header">
        <MainHeader />
      </div>
      <div className="ns-container__content">{props.children}</div>
    </div>
  );
}

export default NoSideLayout;
