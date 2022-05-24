import { useEffect, useState } from "react";
import SelectionBox from "../../../../../../etc/selection/selection";
import AuctionBox from "../auctionBox";
import BButton from "../../../../../../atoms/BButton/bButton";
import BForm from "../../../../../../atoms/BForm/bForm";
import BImage from "../BImage/bImage";
import BInput from "../../../../../../atoms/BInput/bInput";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";

const authenticationOptions = ["GUEST", "AUTHEN", "FULLAUTHEN", "BANNED"];

const CHANGE_STATUS = gql`
  mutation ($userId: ID!, $newStatus: String!) {
    adminChangeUserStatus(userId: $userId, newStatus: $newStatus) {
      id
      username
      status
    }
  }
`;

function UserDetail(props) {
  const [currentStatus, setCurrentStatus] = useState();
  const [selectedAuthen, setSelectedAuthen] = useState();
  const [canConfirm, setCanConfirm] = useState(false);
  const [onGoingProducts, setOnGoingProducts] = useState([]);
  const [deactivedProducts, setDeactivedProducts] = useState([]);
  const { data } = props;

  const [adminChangeUserStatus] = useMutation(CHANGE_STATUS);

  useEffect(() => {
    if (data) {
      setSelectedAuthen(data.status);
      setCurrentStatus(data.status);

      const onGoingProductsList = data.products.filter((product) => {
        if (product.status === "ACTIVED") {
          return new Date().toISOString() < new Date(product.end).toISOString();
        }
      });
      setOnGoingProducts(onGoingProductsList);

      const deactivesList = data.products.filter((product) => {
        if (product.status !== "ACTIVED") {
          return true;
        }
        return new Date().toLocaleString("en-US") >= product.end;
      });
      setDeactivedProducts(deactivesList);
    }
  }, [data]);

  useEffect(() => {
    if (data?.status) {
      if (selectedAuthen !== currentStatus) {
        setCanConfirm(true);
      } else {
        setCanConfirm(false);
      }
    }
  }, [selectedAuthen, currentStatus]);

  const onGoingsList = onGoingProducts.map((product) => {
    return {
      id: product.id,
      title: product.title,
    };
  });

  const deactivesList = deactivedProducts.map((product) => {
    return {
      id: product.id,
      title: product.title,
    };
  });

  const changeStatusHandler = async () => {
    setCurrentStatus(selectedAuthen);
    console.log(`change status to ${selectedAuthen}`);

    const result = await adminChangeUserStatus({
      variables: {
        userId: data?.id,
        newStatus: selectedAuthen,
      },
    });

    if (result.data) {
      console.log(result.data);
    } else if (result.errors) {
      console.error(result.errors);
    }
  };

  return (
    <div className="detailContainer">
      <div className="user__header">
        <div className="user__header__profile">
          <Image
            width={170}
            height={170}
            alt="profile"
            objectFit="cover"
            src={
              data?.profile ||
              "https://bid-this-storage.s3.ap-southeast-1.amazonaws.com/profile/no-profile-2.png"
            }
          />
        </div>
      </div>
      <div className="user__body">
        <BForm formStyles={{ padding: "20px" }}>
          <p className="user__body__title">Detail</p>
          <BInput label="User ID" value={data?.id} disabled={true} />
          <div style={{ display: "flex" }}>
            <BInput
              label="Name"
              value={data?.name?.first}
              disabled={true}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              label="Lastname"
              value={data?.name?.last}
              disabled={true}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <BInput
              label="Email"
              value={data?.email}
              disabled={true}
              inputStyles={{ width: "90%" }}
            />
            <BInput
              label="Username"
              value={data?.username}
              disabled={true}
              inputStyles={{ width: "90%" }}
            />
          </div>
          <BInput label="Phone number" value={data?.phone} disabled={true} />

          <p className="user__body__title">KYC</p>
          <div style={{ display: "flex" }}>
            <BImage label="ID Card" src={data?.kyc.idCard} />
            <BImage label="Selfie with ID Card" src={data?.kyc.photo} />
          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50%",
                marginRight: "2rem",
              }}
            >
              <SelectionBox
                options={authenticationOptions}
                selected={selectedAuthen}
                setSelected={setSelectedAuthen}
              />
            </div>
            <BButton
              title="Comfirm"
              disabled={!canConfirm}
              onClick={changeStatusHandler}
              containerStyles={{ width: "100px" }}
            />
          </div>

          <p className="user__body__title">Auction Infomation</p>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AuctionBox
              label="Ongoing Products"
              amount={onGoingProducts.length}
              list={onGoingsList}
            />
            <AuctionBox
              label="Ended Products"
              style="end"
              list={deactivesList}
              amount={data?.products.length - onGoingProducts.length}
            />
          </div>
          <div style={{ padding: "4rem" }} />
        </BForm>
      </div>
    </div>
  );
}

export default UserDetail;
