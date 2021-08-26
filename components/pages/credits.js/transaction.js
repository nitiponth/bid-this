import Link from "next/link";
import { Fragment } from "react";

function Transaction(props) {
  const date = new Date(props.data.date);
  let product = null;
  if (props.data.productLink) {
    product = (
      <Fragment>
        —{" "}
        <Link href={props.data.productLink}>
          <a href="#" className="transaction__link">
            {props.data.productName}
          </a>
        </Link>
      </Fragment>
    );
  }

  return (
    <div className="transaction">
      <div className="transaction__title">
        {props.data.title} {product}
        <div className="transaction__value">{props.data.value} baht</div>
      </div>

      <div className="transaction__date">
        <address>{date.toLocaleDateString()}</address>
        <address>{date.toLocaleTimeString()}</address>
      </div>
    </div>
  );
}

export default Transaction;
