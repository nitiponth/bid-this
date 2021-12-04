import Link from "next/link";
import { FaSearch, FaBox } from "react-icons/fa";

function ProductData(props) {
  const { id, title, images, seller, price, category, start, end, status } =
    props.data;

  let productStauts = status;
  if (new Date(end) < new Date() && status === "ACTIVED") {
    productStauts = "end";
  }

  return (
    <div className="productDataContainer">
      <div className="left">
        <img src={images[0]} className={"left__image"} />
      </div>
      <div className="body">
        <div className="body__productId">{id}</div>
        <div className="body__title">📦 {title}</div>
        <Link href={`/users/${seller.id}`}>
          <a className="body__seller">🏠 {seller.username}</a>
        </Link>
        <div className="body__category">📖 {category.toLowerCase()}</div>
      </div>
      <div className="auction">
        <div className="auction__title">Auction infomation</div>
        <div className="auction__start">
          Start:
          <span style={{ paddingLeft: "2rem" }}>{start}</span>
        </div>
        <div className="auction__end">
          End: <span style={{ paddingLeft: "2rem" }}>{end}</span>
        </div>
        <div className="auction__status">
          Status:{" "}
          <span style={{ paddingLeft: "1rem" }}>
            {productStauts.toLowerCase()}
          </span>
        </div>
      </div>
      <div className="buttonGroup">
        <Link href={"/admin/"}>
          <a className="buttonGroup__btn">
            <FaSearch />
          </a>
        </Link>
        <Link href={`/items/${id}`}>
          <a className="buttonGroup__btn">
            <FaBox />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ProductData;
