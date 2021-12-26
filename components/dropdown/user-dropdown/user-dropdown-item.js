function UserDropdownItem({
  onClickHandler,
  leftProfile,
  leftIcon,
  children,
  rightIcon,
  style,
}) {
  let addStyle = "";
  if (style === "red") {
    addStyle = "icon-button--red";
  }

  return (
    <a className="user-dropdown-item" onClick={onClickHandler}>
      {leftProfile && (
        <span className="icon-button icon-button--left">
          <img src={leftProfile} className="icon-button-profile" />
        </span>
      )}
      {leftIcon && (
        <span className="icon-button icon-button--left">
          <div className={`icon-button-img ${addStyle}`}>{leftIcon}</div>
        </span>
      )}
      {children}
      {rightIcon && (
        <span className="icon-button icon-button--right">
          <div className={`icon-button-img ${addStyle}`}>{rightIcon}</div>
        </span>
      )}
    </a>
  );
}

export default UserDropdownItem;
