import useTimer from "../../../hooks/useTimer";

function AuctionDropdownItem(props) {
  const time = useTimer(props.auctionTime);

  let auctionTextClass = "auction__time";
  if (time.timerHours == 0 && time.timerMinutes <= 14) {
    auctionTextClass = "auction__time auction__time--red";
  }

  return (
    <a
      href="#"
      className="user-dropdown-item user-dropdown-item--auction"
      onClick={props.onClickHandler}
    >
      {props.auctionImg && (
        <span className="icon-button icon-button--left">
          <img src={props.auctionImg} className="auction__img" />
        </span>
      )}
      {props.children}
      {props.auctionTime && (
        <span className="icon-button icon-button--right">
          <div className={auctionTextClass}>
            {time.timerComplete ||
              `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`}
            {time.timerComplete && "END"}
          </div>
        </span>
      )}
    </a>
  );
}

export default AuctionDropdownItem;
