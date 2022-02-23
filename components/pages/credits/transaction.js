import Link from "next/link";
import { Fragment, useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";

function Transaction(props) {
  const date = new Date(props.data.createdAt);
  let product = null;
  if (props.data.product && props.data.product.id) {
    product = (
      <Fragment>
        —{" "}
        <Link href={`http://localhost:3000/items/${props.data.product.id}`}>
          <a href="#" className="transaction__link">
            {props.data.product.title}
          </a>
        </Link>
      </Fragment>
    );
  }

  return useMemo(() => (
    <div className="transaction">
      <div className="transaction__title">
        {props.data.type.charAt(0) + props.data.type.slice(1).toLowerCase()}
        {product}
        {props.data.status && (
          <span className="transaction__check">
            <FaCheckCircle />
          </span>
        )}
        <div className="transaction__value">
          {props.data.amount.toLocaleString("en")} baht
        </div>
      </div>

      <div className="transaction__date">
        <address>{date.toLocaleDateString()}</address>
        <address>{date.toLocaleTimeString()}</address>
      </div>
    </div>
  ));
}

export default Transaction;
