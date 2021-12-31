import { useEffect, useRef } from "react";

function Backdrop({ show, onClose, children }) {
  const modalRef = useRef();

  const listener = (event) => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [show, modalRef, onClose]);

  return show ? (
    <div className="backdrop" onClose={onClose} ref={modalRef}>
      {children}
    </div>
  ) : (
    ""
  );
}

export default Backdrop;
