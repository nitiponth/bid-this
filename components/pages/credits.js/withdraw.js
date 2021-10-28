import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Backdrop from "../../layout/backdrop";
import AddAccountForm from "./addAccountForm";

const WITHDRAW = gql`
  mutation ($bankId: String!, $amount: Int!) {
    withdrawCredit(bankId: $bankId, amount: $amount) {
      id
      amount
      type
      status
    }
  }
`;

function Withdraw(props) {
  const [showForm, setShowForm] = useState(false);
  const [withdrawCredit] = useMutation(WITHDRAW);
  const amountRef = useRef();

  if (!props.visible) {
    return null;
  }

  let existAccount = "";
  if (props.banks && props.banks.length > 0) {
    existAccount = props.banks.map((account) => {
      let btn = (
        <button
          className="existAccount__btn"
          onClick={async () => {
            const amount = +amountRef.current.value;
            if (amount < 30) {
              return;
            }

            const con = confirm(
              `Withdraw ${amount}฿ to *****${
                account.bankInfo.last_digits
              } (${account.bankInfo.brand.toUpperCase()})`
            );

            if (!con) {
              return;
            }
            const { data, errors } = await withdrawCredit({
              variables: {
                amount,
                bankId: account.id,
              },
            });

            if (data) {
              console.log(data);
              alert(
                `Withdraw ${amount} successfully. waiting for banking process...`
              );
            }
            if (errors) {
              console.log(data);
            }
          }}
        >
          Withdraw to this account
        </button>
      );
      if (!account.bankInfo.active) {
        btn = (
          <button className="existAccount__btn existAccount__btn--disabled">
            Withdraw to this account
          </button>
        );
      }
      return (
        <div className="withdraw__bank" key={account.id}>
          <div className="withdraw__existAccount">
            <div className="existAccount">
              <div className="existAccount__left">
                <p className="existAccount__digits">
                  ******{account.bankInfo.last_digits}
                </p>
                <p className="existAccount__brand">
                  {account.bankInfo.brand.toUpperCase()}
                </p>
              </div>
              <div className="existAccount__right">{btn}</div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="withdraw-container">
      <div className="withdraw__title">Enter amount of withdraw</div>
      <div className="withdraw__form">
        <input
          id="amount"
          type="number"
          placeholder="Withdraw fee is 50฿"
          className="withdraw__form__input"
          defaultValue={null}
          ref={amountRef}
        />
        ฿
      </div>
      {existAccount}
      <button
        className="addAccount-btn"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Add new account
      </button>
      <Backdrop show={showForm}>
        <AddAccountForm onClose={setShowForm} refetch={props.refetch} />
      </Backdrop>
    </div>
  );
}

export default Withdraw;
