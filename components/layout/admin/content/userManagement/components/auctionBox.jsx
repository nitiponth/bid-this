import router, { useRouter } from "next/router";

import DropdownBox from "../../../../../etc/selection/dropdownBox";

function AuctionBox({ label, style, amount, list }) {
  const router = useRouter();
  let countStyle = "auctionBox__count";
  if (style === "end") {
    countStyle = "auctionBox__count auctionBox__count--deactived";
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label className="BLabel">{label}</label>
      <div className="auctionBox">
        <div className={countStyle}>{amount}</div>
      </div>
      <div style={{ width: "80%", marginLeft: "1.5rem" }}>
        <DropdownBox
          options={list}
          title="Products List"
          onSelected={(optionId) => {
            //change this -> route to admin manage product.
            router.push(`/items/${optionId}`);
          }}
        />
      </div>
    </div>
  );
}

export default AuctionBox;
