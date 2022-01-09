import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import BTopupModal from "./bTopupModal";

function TopupWithCrediteCard({ amount }) {
  const [activeTopupModal, setActiveTopupModal] = useState(false);
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
        amount={amount}
      />
    </Fragment>
  );
}

export default TopupWithCrediteCard;
