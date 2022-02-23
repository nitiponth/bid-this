import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import SelectionBox from "../../etc/selection/selection";

const CREATE_REP = gql`
  mutation ($name: String!, $brand: String!, $number: String!) {
    createRep(name: $name, brand: $brand, number: $number)
  }
`;
function AddAccountForm(props) {
  const categoryOptions = [
    "Bank of Ayudhya (Krungsri)",
    "Bangkok Bank",
    "Kasikornbank",
    "Krungthai Bank",
    "Siam Commercial Bank",
    "TMB Bank",
  ];
  const [seletedBank, setSelectedBank] = useState("Select Bank");
  const numberRef = useRef();
  const nameRef = useRef();

  const [createRep] = useMutation(CREATE_REP);

  const onCreateRecipient = async () => {
    const bankCode = {
      bay: "Bank of Ayudhya (Krungsri)",
      bbl: "Bangkok Bank",
      kbank: "Kasikornbank",
      ktb: "Krungthai Bank",
      scb: "Siam Commercial Bank",
      tmb: "TMB Bank",
    };

    if (seletedBank === "Select Bank") {
      return;
    }

    const brand = Object.keys(bankCode).find(
      (key) => bankCode[key] === seletedBank
    );
    if (!brand) {
      return;
    }
    const number = numberRef.current.value;
    const name = nameRef.current.value;
    if (number.length != 10 || name.trim().length < 2) {
      return;
    }

    const { data, errors } = await createRep({
      variables: {
        name,
        brand,
        number,
      },
    });

    if (data) {
      props.refetch();
      props.onClose(false);
    }
    if (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="addAccount-container">
      <div className="addAcc__title">Add new account</div>
      <div className="addAcc__select-box">
        <SelectionBox
          options={categoryOptions}
          selected={seletedBank}
          setSelected={setSelectedBank}
        />
      </div>
      <form className="addAcc__form">
        <label
          htmlFor="number"
          className="glabel glabel--form"
          style={{ textAlign: "left" }}
        >
          Bank account number
        </label>
        <input
          id="number"
          type="number"
          placeholder="Ex. 1234567890"
          className="addAcc__input"
          ref={numberRef}
          defaultValue={null}
        />
        <label
          htmlFor="number"
          className="glabel glabel--form"
          style={{ textAlign: "left" }}
        >
          Account holder name
        </label>
        <input
          id="number"
          placeholder="Ex. John Doh"
          className="addAcc__input"
          defaultValue={null}
          ref={nameRef}
        />
        <div className="addAcc__btn-group">
          <button
            type="button"
            className="addAcc__btn addAcc__btn--cancel"
            onClick={() => {
              props.onClose(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="addAcc__btn addAcc__btn--save"
            onClick={onCreateRecipient}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAccountForm;
