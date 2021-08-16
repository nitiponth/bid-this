import MainHeader from "../main-header";

function NoSideLayout(props) {
  let nsClass = "ns-container";
  if (props.height == "minheight") {
    nsClass = "ns-container ns-container--minheight";
  }

  return (
    <div className={nsClass}>
      <div className="ns-container__header">
        <MainHeader />
      </div>
      <div className="ns-container__content">{props.children}</div>
    </div>
  );
}

export default NoSideLayout;
