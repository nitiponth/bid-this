function ItemHero() {
  return (
    <div className="item-hero">
      <div className="item-hero__img-box">
        <img
          src="/images/items/keyboard.jpg"
          alt="hero product"
          className="item-hero__img"
        />
      </div>

      <div className="item-hero__detail">
        <div className="item-hero__detail-title">Keychrone</div>
        <a href="#" className="item-hero__detail-seller">
          <span className="at-sign">@</span>seller
        </a>
        <div className="item-hero__detail-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus
          purus, malesuada interdum orci molestie efficitur. Sed at dui elit.
          Suspendisse ultrices justo et ante varius pretium. Maecenas non.
        </div>
        <div className="item-hero__detail-auction">
          <div className="item-hero__detail-auction-res">
            <span className="item-hero__detail-auction-text">Current bid</span>
            <span className="auction-text">{`2000`}฿</span>
          </div>
          <div className="item-hero__detail-auction-time">
            <span className="item-hero__detail-auction-text">
              Auction ending in
            </span>
            <span className="auction-text">
              {`2`}h {`10`}m {`32`}s
            </span>
          </div>
        </div>

        <a href="#" className="btn">
          Place a bid
        </a>
      </div>
    </div>
  );
}

export default ItemHero;
