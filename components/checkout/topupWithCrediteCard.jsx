import { Fragment, useState } from "react";
import BTopupModal from "./bTopupModal";

import waitingImage from "../../public/images/SILY/Saly-1.png";
import BModalCard from "../atoms/BModalCard/BModalCard";

function TopupWithCrediteCard({ amount }) {
  const [activeTopupModal, setActiveTopupModal] = useState(false);
  const [activeWaitingModal, setActiveWaitingModal] = useState(false);

  const [waitingText, setWaitingText] = useState("Process is ongoing...");
  const [waitingImg, setWaitingImg] = useState(waitingImage);
  return (
    <Fragment>
      <div
        className="pay-btn"
        style={{ display: "flex", justifyContent: "center" }}
        onClick={() => setActiveTopupModal(true)}
      >
        Pay with New Credit Card
      </div>
      <BTopupModal
        active={activeTopupModal}
        onClose={() => setActiveTopupModal(false)}
        setActiveWaitingModal={setActiveWaitingModal}
        setWaitingText={setWaitingText}
        amount={amount}
      />
      <BModalCard
        active={activeWaitingModal}
        canClose={true}
        title={waitingText}
        cardImage={waitingImg}
        onCloseHandler={() => {
          setActiveWaitingModal(false);
          setWaitingText("Process is ongoing...");
          setWaitingImg(waitingImage);
        }}
      />
    </Fragment>
  );
}

export default TopupWithCrediteCard;
