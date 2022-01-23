import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Mobile = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#mobile"))
    : null;
};

export default Mobile;
