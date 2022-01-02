import { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";

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

function SelectionBox(props) {
  const [isActive, setIsActive] = useState(false);

  let selectionStyle = "selection-btn ";
  if (isActive) {
    selectionStyle = "selection-btn selection-btn--active";
  }

  let domNode = useClickOutside(() => {
    setIsActive(false);
  });

  return (
    <div className="selection">
      <div
        className={selectionStyle}
        onClick={(e) => setIsActive(!isActive)}
        ref={domNode}
      >
        {props.selected}
        <span className="fas fa-caret-down">
          <FaCaretDown />
        </span>

        {isActive && (
          <div className="selection-content">
            {props.options.map((option) => (
              <div
                key={option}
                onClick={(e) => {
                  props.setSelected(option);
                  setIsActive(false);
                }}
                className="selection-item"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionBox;
