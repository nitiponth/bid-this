import { useEffect, useRef, useState } from "react";

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

  return (
    <li ref={domNode} className="user-nav__icon-box">
      <a
        href="#"
        className="user-nav__icon"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={props.icon} alt="icon" className="user-nav__icon" />
      </a>
      {props.notification && (
        <span className="user-nav__notification">{props.notification}</span>
      )}
      {open && props.children}
    </li>
  );
}

export default NavItem;
