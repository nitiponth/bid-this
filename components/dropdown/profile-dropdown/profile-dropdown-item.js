import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";

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

function PopupItem(props) {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  let component = (
    <Fragment>
      <Image src={props.icon} width={23} height={23} alt="icon" className="" />
      {props.notification && (
        <span className="user-nav__notification">{props.notification}</span>
      )}
    </Fragment>
  );

  return (
    <div
      ref={domNode}
      className="popup__btn"
      onClick={() => {
        setOpen(!open);
      }}
    >
      {component}
      {open && props.children}
    </div>
  );
}

export default PopupItem;
