function UserDropdownItem(props) {
  let addStyle = "";
  if (props.style === "red") {
    addStyle = "icon-button--red";
  }

  return (
    <a href="#" className="user-dropdown-item" onClick={props.onClickHandler}>
      {props.leftProfile && (
        <span className="icon-button icon-button--left">
          <img src={props.leftProfile} className="icon-button-profile" />
        </span>
      )}
      {props.leftIcon && (
        <span className="icon-button icon-button--left">
          <div className={`icon-button-img ${addStyle}`}>{props.leftIcon}</div>
        </span>
      )}
      {props.children}
      {props.rightIcon && (
        <span className="icon-button icon-button--right">
          <div className={`icon-button-img ${addStyle}`}>{props.rightIcon}</div>
        </span>
      )}
    </a>
  );
}

export default UserDropdownItem;