import { createContext, useState } from "react";

const SideContext = createContext({
  content: null,

  setContent: (content) => {},
});

export function SideContextProvider(props) {
  const [content, setContent] = useState();

  function contentHandler(content) {
    setContent(content);
  }

  const context = {
    sideContent: content,

    setSideContent: contentHandler,
  };

  return (
    <SideContext.Provider value={context}>
      {props.children}
    </SideContext.Provider>
  );
}

export default SideContext;
