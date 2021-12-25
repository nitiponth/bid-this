import { Fragment, useEffect, useRef, useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let setOpenHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", setOpenHandler);

    return () => {
      document.removeEventListener("mousedown", setOpenHandler);
    };
  });

  return domNode;
};

function NavItem(props) {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  let component = (
    <Fragment>
      {/* <img src={props.icon} alt="icon" className="user-nav__icon" /> */}
      <BsBookmarkFill size={22} color="#f8cb71" className="user-nav__icon" />
      {props.notification !== 0 ? (
        <span className="user-nav__notification">{props.notification}</span>
      ) : null}
    </Fragment>
  );

  if (props.type === "login") {
    component = (
      <Fragment>
        <img src={props.icon} alt="icon" className="user-nav__icon" />
      </Fragment>
    );
  }

  if (props.isLogin) {
    component = (
      <Fragment>
        <div className="user-nav__user">
          <span className="user-nav__user--credits">{props.credits}฿</span>
          <span className="user-nav__user--name">{props.user}</span>
        </div>
        <img
          src={props.profile}
          alt="user-profile"
          className="user-nav__profile"
        />
      </Fragment>
    );
  }

  return (
    <div
      ref={domNode}
      className="user-nav__icon-box"
      onClick={() => {
        setOpen(!open);
      }}
    >
      {component}
      {open && props.children}
    </div>
  );
}

export default NavItem;
