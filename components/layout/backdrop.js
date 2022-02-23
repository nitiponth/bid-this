import { useEffect, useRef, useState } from "react";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const styles = {
  modal: {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",

    overflow: "none",
    width: "100%",
    minWidth: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "#1cccc",
    padding: 0,
  },
  closeIcon: {
    fill: "#fff",
  },
};

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

  return (
    <Modal
      open={show}
      onClose={() => {
        onClose();
      }}
      closeOnEsc
      closeOnOverlayClick
      styles={styles}
      blockScroll={true}
      showCloseIcon={false}
      ref={modalRef}
    >
      {children}
    </Modal>
  );
}

export default Backdrop;
