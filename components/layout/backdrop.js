import { useEffect, useRef } from "react";

function Backdrop({ show, onClose, children }) {
  // const modalRef = useRef(null);

  // useEffect(() => {
  //   const listener = (event) => {
  //     console.log(modalRef.current.contains(event.target));
  //     console.log(event.target);
  //     if (
  //       show &&
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target)
  //     ) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", listener);

  //   return () => {
  //     document.removeEventListener("mousedown", listener);
  //   };
  // }, [show]);

  return show ? (
    <div className="backdrop" onClose={onClose}>
      {children}
    </div>
  ) : (
    ""
  );
}

export default Backdrop;
