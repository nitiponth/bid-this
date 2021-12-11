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

function DropdownBox(props) {
  const [isActive, setIsActive] = useState(false);

  let selectionStyle = "selection-btn ";
  if (isActive) {
    selectionStyle = "selection-btn selection-btn--active";
  }
  if (props.disabled) {
    selectionStyle = "selection-btn selection-btn--disabled";
  }

  let domNode = useClickOutside(() => {
    setIsActive(false);
  });

  return (
    <div className="selection">
      <div
        className={selectionStyle}
        onClick={(e) => {
          if (props.disabled) return;
          setIsActive(!isActive);
        }}
        ref={domNode}
      >
        {props.title}
        <span className="fas fa-caret-down">
          <FaCaretDown />
        </span>

        {isActive && (
          <div className="selection-content" style={{ marginBottom: "3rem" }}>
            {props.options.map((option) => (
              <div
                key={option.id}
                onClick={(e) => {
                  props.onSelected(option.id);
                }}
                className="selection-item"
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownBox;
