import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

import Backdrop from "../../layout/backdrop";
import img from "../../../public/images/SILY/Saly-23.png";

function BModalCard({ active, canClose, onClose, title, subtitle }) {
  return (
    <Backdrop show={active} onClose={onClose}>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          width: "350px",
          minHeight: "400px",
          borderRadius: "2rem",
          padding: "1rem",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {canClose && (
          <div
            className="close-btn"
            style={{
              fontSize: "2rem",
              position: "absolute",
              top: 20,
              right: 20,
            }}
            onClick={onClose}
          >
            <IoCloseSharp />
          </div>
        )}
        <Image src={img} width={"250px"} height={"250px"} />
        <div style={{ fontSize: "2rem", color: "black", marginTop: "2rem" }}>
          {title}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            marginTop: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      </div>
    </Backdrop>
  );
}

export default BModalCard;
