function Backdrop(props) {
  return props.show ? <div className="backdrop">{props.children}</div> : "";
}

export default Backdrop;
