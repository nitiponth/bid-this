import { useEffect, useRef } from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);

  z-index: 1000;
`;

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

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  if (!show) return null;

  return <Modal ref={modalRef}>{children}</Modal>;
}

export default Backdrop;
