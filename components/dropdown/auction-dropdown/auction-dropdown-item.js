import Image from "next/image";
import { useEffect, useState } from "react";
import useTimer from "../../../hooks/useTimer";

function AuctionDropdownItem({
  id,
  onClick,
  start,
  end,
  price,
  image,
  children,
}) {
  const startTime = useTimer(start);
  const endTime = useTimer(end);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (new Date().toISOString() >= new Date(start).toISOString()) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }, [startTime]);

  let auctionTextClass = "auction__time";
  if (endTime.timerHours == 0 && endTime.timerMinutes <= 14) {
    auctionTextClass = "auction__time auction__time--red";
  }

  return (
    <a
      href="#"
      className="user-dropdown-item user-dropdown-item--auction"
      onClick={onClick}
    >
      <span className="icon-button icon-button--left">
        <Image src={image} width={50} height={50} className="auction__img" />
      </span>

      {children}
      {endTime && (
        <span className="icon-button icon-button--right">
          <p style={{ marginBottom: "0.5rem", textAlign: "right" }}>
            {isStart ? "Ending in" : "Starting in"}
          </p>
          <div className={auctionTextClass}>
            {isStart
              ? `${endTime.timerHours}h ${endTime.timerMinutes}m ${endTime.timerSeconds}s`
              : `${startTime.timerHours}h ${startTime.timerMinutes}m ${startTime.timerSeconds}s`}
          </div>
        </span>
      )}
    </a>
  );
}

export default AuctionDropdownItem;
