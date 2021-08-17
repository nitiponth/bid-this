function UserDropdownItem(props) {
  return (
    <a href="#" className="user-dropdown-item" onClick={props.onClickHandler}>
      {props.leftIcon && (
        <span className="icon-button icon-button--left">
          <img src={props.leftIcon} className="icon-button-img" />
        </span>
      )}
      {props.children}
      {props.rightIcon && (
        <span className="icon-button icon-button--right">
          <img src={props.rightIcon} className="icon-button-img" />
        </span>
      )}
    </a>
  );
}

export default UserDropdownItem;
