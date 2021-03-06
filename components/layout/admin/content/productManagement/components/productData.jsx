import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSearch, FaBox } from "react-icons/fa";
import { useAdminStore } from "../../../../../../store/admin-Content-Store";

function ProductData(props) {
  const { id, title, images, seller, price, category, start, end, status } =
    props.data;

  const { changeState, defineProductId } = useAdminStore();

  const router = useRouter();

  let productStauts = status;
  if (new Date(end) < new Date() && status === "ACTIVED") {
    productStauts = "end";
  }

  return (
    <div className="productDataContainer">
      <div className="left">
        <Image
          src={images[0]}
          width={100}
          height={100}
          objectFit="cover"
          className={"left__image"}
        />
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
        <div
          className="buttonGroup__btn"
          onClick={() => {
            changeState("PRODUCT_DETAIL");
            defineProductId(id);

            router.push("/admin");
          }}
        >
          <FaSearch />
        </div>
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
