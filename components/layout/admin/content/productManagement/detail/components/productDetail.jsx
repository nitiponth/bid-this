import { useEffect, useState } from "react";
import BButton from "../../../../../../atoms/BButton/bButton";
import BForm from "../../../../../../atoms/BForm/bForm";
import BInput from "../../../../../../atoms/BInput/bInput";
import DropdownBox from "../../../../../../etc/selection/dropdownBox";
import BCarousel from "../../../../../../molecules/bCarousel/bCarousel";

function ProductDetail({ data }) {
  const [bidderList, setBidderList] = useState([]);

  const [canDeactive, setCanDeactive] = useState(false);
  const [thisTime, setThisTime] = useState(new Date());
  const {
    id,
    title,
    images,
    price,
    category,
    condition,
    createdAt,
    start,
    end,
    seller,
    status,
    bids,
  } = data;

  let statusText = status;

  useEffect(() => {
    if (bids) {
      const list = bids.map((bid, index) => {
        return {
          id: bid.bidder.id,
          title: `${index + 1}) ${
            bid.bidder.username
          } (${bid.bidPrice.toLocaleString("EN-us")}฿)`,
        };
      });
      setBidderList(list);
    }
  }, [data]);

  if (
    status === "ACTIVED" &&
    thisTime.toISOString() >= new Date(start).toISOString()
  ) {
    statusText = "AUCTIONING";
  }

  if (
    status === "ACTIVED" &&
    // status !== "AUCTIONING" &&
    thisTime.toISOString() > new Date(end).toISOString()
  ) {
    statusText = "END";
  }

  useEffect(() => {
    if (
      status === "ACTIVED" &&
      thisTime.toISOString() <= new Date(start).toISOString()
    ) {
      setCanDeactive(true);
    } else {
      setCanDeactive(false);
    }
  }, [start, thisTime]);

  return (
    <div className="detailContainer">
      <div className="product__carousel">
        <BCarousel items={images} configSize="small" />
      </div>
      <div className="product__body">
        <BForm>
          <p className="user__body__title">Product Infomation</p>
          <div style={{ display: "flex" }}>
            <BInput
              disabled={true}
              label="Product Id"
              value={id}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              disabled={true}
              label="Title"
              value={title}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <BInput
              disabled={true}
              label="Seller Id"
              value={seller.id}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              disabled={true}
              label="Seller Username"
              value={seller.username}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <BInput
              disabled={true}
              label="Category"
              value={category}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              disabled={true}
              label="Condition"
              value={condition}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <BInput
            disabled={true}
            label="Seller create product at"
            value={createdAt}
          />

          <p className="user__body__title">Auction Infomation</p>
          <div style={{ display: "flex" }}>
            <BInput
              disabled={true}
              label="Auction start at"
              value={start}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              disabled={true}
              label="Auction end at"
              value={end}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <BInput
              disabled={true}
              label="Initial price"
              value={price.initial.toLocaleString("EN-us")}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              disabled={true}
              label="Current price"
              value={price.current?.toLocaleString("EN-us") || "-"}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                minWidth: "45%",
                display: "flex",
              }}
            >
              <DropdownBox
                disabled={price.current === null}
                options={bidderList}
                title={"Bidder List"}
                onSelected={(optionId) => {
                  console.log(optionId);
                }}
              />
            </div>

            <div
              style={{
                minWidth: "50%",
                display: "flex",
              }}
            >
              <BInput
                disabled={true}
                label="Current Winner"
                value={bids[bids.length - 1]?.bidder.username || "-"}
                inputStyles={{ width: "90%" }}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <BInput
              disabled={true}
              label="Status"
              value={statusText}
              inputStyles={{ width: "90%" }}
            />
            <BButton
              disabled={!canDeactive}
              title="Ban Product"
              onClick={() => {
                console.log("deactived click!");
              }}
              containerStyles={{
                width: "300px",
                height: "40px",
                marginRight: "16rem",
                alignSelf: "center",
              }}
            />
          </div>

          {/* <p className="user__body__title">Bid Infomation</p> */}

          <div style={{ padding: "4rem" }} />
        </BForm>
      </div>
    </div>
  );
}

export default ProductDetail;
