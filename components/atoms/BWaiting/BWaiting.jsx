import Backdrop from "../../layout/backdrop";
import img from "../../../public/images/SILY/Saly-2.png";
import Image from "next/image";

import React from "react";

import { IoCloseSharp } from "react-icons/io5";

function BWaiting({ active, onClose, canClose }) {
  return (
    <Backdrop show={active} onClose={onClose}>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          width: "350px",
          height: "400px",
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
        <Image src={img} width={"300px"} height={"300px"} />
        <div style={{ fontSize: "2rem", color: "black" }}>
          Waiting for Upload Image.
        </div>
      </div>
    </Backdrop>
  );
}

export default BWaiting;
