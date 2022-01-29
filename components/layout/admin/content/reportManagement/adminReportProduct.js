import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { toPhoneNumber } from "../../../../../utils/stringFormat";
import BButton from "../../../../atoms/BButton/bButton";
import BForm from "../../../../atoms/BForm/bForm";
import BInput from "../../../../atoms/BInput/bInput";
import BModalCard from "../../../../atoms/BModalCard/BModalCard";
import BTextarea from "../../../../atoms/BTextarea/bTextarea";
import SelectionBox from "../../../../etc/selection/selection";

import SalyImage from "../../../../../public/images/SILY/Saly-1.png";
import BLoading from "../../../../molecules/BLoading/BLoading";
import Image from "next/image";

const GET_PRODUCT_REPORT = gql`
  query ($reportId: ID!) {
    getReportProduct(reportId: $reportId) {
      id
      product {
        id
        title
        desc
        category
        condition
        start
        images
        seller {
          id
          username
          status
          join
          phone
          email
        }
        price {
          initial
          bidOffer
        }
      }
      reportBy {
        id
        username
        status
      }
      body
      reportStatus
    }
  }
`;

const UPDATE_PRODUCT_REPORT = gql`
  mutation ($reportId: ID!, $type: ReportType!, $newStatus: ReportStatus!) {
    updateReportStatus(reportId: $reportId, type: $type, newStatus: $newStatus)
  }
`;

const statusOptions = ["RECEIVED", "CHECKING", "DONE"];

function AdminReportProduct(props) {
  const { reportId } = props;
  const router = useRouter();

  const [reportData, setReportData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Loading");
  const [activeModalCard, setActiveModalCard] = useState(false);

  const { data, loading, error } = useQuery(GET_PRODUCT_REPORT, {
    fetchPolicy: "network-only",
    variables: {
      reportId,
    },
  });

  const [updateProductReport] = useMutation(UPDATE_PRODUCT_REPORT);

  useEffect(() => {
    if (!loading && data) {
      setReportData(data.getReportProduct);
      setSelectedStatus(data.getReportProduct.reportStatus);
    } else if (error) {
      console.error(error);
    }
  }, [data, loading, error]);

  return (
    <div className="adminContent">
      <div className="admin__content">
        <Fragment>
          {!reportData ? (
            <BLoading />
          ) : (
            <div className="ProductReportContainer">
              <BModalCard
                active={activeModalCard}
                canClose={true}
                onClose={() => {
                  setActiveModalCard(false);
                }}
                title={"Done"}
                subtitle={"Update report status successfully."}
                cardImage={SalyImage}
              />
              <div className="RProduct">
                <div className="RProduct__card">
                  <Image
                    className="RProduct__card__image"
                    src={reportData.product.images[0]}
                    width={50}
                    height={50}
                    alt="product Image"
                  />
                  <div className="RProduct__card__title">
                    {reportData.product.title}
                  </div>
                  <div className="RProduct__card__seller">
                    @{reportData.product.seller.username}
                  </div>
                  <BForm>
                    <BTextarea
                      disabled={true}
                      inputStyles={{
                        width: "230px",
                        height: "120px",
                        marginBottom: "1rem",
                        color: "#aaa",
                      }}
                      resize={"none"}
                      value={reportData.product.desc}
                    />
                  </BForm>
                </div>
              </div>
              <div className="RProduct__info">
                <div className="RProduct__info__label">
                  Product Information
                  <span
                    style={{
                      fontSize: "1.2rem",
                      marginLeft: "1rem",
                      color: "#aaa",
                    }}
                  >
                    {`(Product ID: ${reportData.product.id})`}
                  </span>
                </div>
                <BForm>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <BInput
                        disabled={true}
                        label={"Title"}
                        value={reportData.product.title}
                        inputStyles={{ marginBottom: "2rem", width: "90%" }}
                      />
                      <BInput
                        disabled={true}
                        label={"Category"}
                        value={reportData.product.category}
                        inputStyles={{ marginBottom: "2rem", width: "60%" }}
                      />
                      <BInput
                        disabled={true}
                        label={"Reserve Price"}
                        value={`${reportData.product.price.initial.toLocaleString()}฿`}
                        inputStyles={{ marginBottom: "2rem", width: "80%" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <BInput
                        disabled={true}
                        label={"Condition"}
                        value={reportData.product.condition}
                        inputStyles={{ marginBottom: "2rem", width: "95%" }}
                      />
                      <BInput
                        disabled={true}
                        label={"Start Auction"}
                        value={new Date(
                          reportData.product.start
                        ).toLocaleString("EN-us")}
                        inputStyles={{ marginBottom: "2rem", width: "95%" }}
                      />
                      <BInput
                        disabled={true}
                        label={"Bid Offer"}
                        value={`${reportData.product.price.bidOffer.toLocaleString()}฿`}
                        inputStyles={{ marginBottom: "2rem", width: "80%" }}
                      />
                    </div>
                  </div>
                  <BTextarea
                    label={"Report message"}
                    disabled={true}
                    value={reportData.body}
                    inputStyles={{
                      width: "100%",
                      color: "#777",
                      height: "90px",
                    }}
                    resize={"none"}
                  />
                </BForm>
              </div>
              <div style={{ flexBasis: "100%", height: 0 }} />
              {/* action box */}
              <div>
                <div className="RProduct__action">
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#333",
                      marginBottom: "2.5rem",
                    }}
                  >
                    Action Box
                  </div>
                  <BForm>
                    <BButton
                      title={"Seller Profile Page"}
                      onClick={() => {
                        router.push(`/users/${reportData.product.seller.id}`);
                      }}
                      containerStyles={{ marginBottom: "1rem" }}
                    />
                    <BButton
                      title={"Auction Detail Page"}
                      onClick={() => {
                        router.push(`/items/${reportData.product.id}`);
                      }}
                      containerStyles={{
                        marginBottom: "1rem",
                      }}
                    />
                    <BButton
                      title={"Ban this product"}
                      containerStyles={{
                        marginBottom: "1rem",
                        backgroundColor: "salmon",
                        color: "white",
                      }}
                    />
                  </BForm>
                </div>
                <div
                  className="RProduct__action"
                  style={{ transform: "translateY(-50px)" }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#333",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Report Status
                  </div>
                  <SelectionBox
                    options={statusOptions}
                    selected={selectedStatus}
                    setSelected={setSelectedStatus}
                  />
                  <BForm>
                    <BButton
                      title={"Confirm"}
                      onClick={async () => {
                        const { data, errors } = await updateProductReport({
                          variables: {
                            reportId,
                            type: "Product",
                            newStatus: selectedStatus,
                          },
                        });

                        if (data) {
                          //   console.log(data);
                          setActiveModalCard(true);
                        } else if (errors) {
                          console.error(errors);
                        }
                      }}
                      containerStyles={{ width: "10rem" }}
                    />
                  </BForm>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <div className="RProduct__info">
                  <div className="RProduct__info__label">
                    Seller Information
                    <span
                      style={{
                        fontSize: "1.2rem",
                        marginLeft: "1rem",
                        color: "#aaa",
                      }}
                    >
                      {`(User ID: ${reportData.product.seller.id})`}
                    </span>
                  </div>
                  <BForm>
                    {/* left */}
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                        }}
                      >
                        <BInput
                          disabled={true}
                          label={"Username"}
                          value={reportData.product.seller.username}
                          inputStyles={{ marginBottom: "2rem", width: "90%" }}
                        />
                        <BInput
                          disabled={true}
                          label={"Contact Number"}
                          value={toPhoneNumber(reportData.product.seller.phone)}
                          inputStyles={{ marginBottom: "2rem", width: "90%" }}
                        />
                      </div>
                      {/* right */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                        }}
                      >
                        <BInput
                          disabled={true}
                          label={"Authentication"}
                          value={reportData.product.seller.status}
                          inputStyles={{ marginBottom: "2rem", width: "70%" }}
                        />
                        <BInput
                          disabled={true}
                          label={"Email"}
                          value={reportData.product.seller.email}
                          inputStyles={{ marginBottom: "2rem", width: "90%" }}
                        />
                      </div>
                    </div>
                  </BForm>
                </div>
                <div className="RProduct__info">
                  <div className="RProduct__info__label">
                    Report By
                    <span
                      style={{
                        fontSize: "1.2rem",
                        marginLeft: "1rem",
                        color: "#aaa",
                      }}
                    >
                      {`(User ID: ${reportData.reportBy.id})`}
                    </span>
                  </div>
                  <BForm>
                    {/* left */}
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                        }}
                      >
                        <BInput
                          disabled={true}
                          label={"Username"}
                          value={reportData.reportBy.username}
                          inputStyles={{ marginBottom: "2rem", width: "90%" }}
                        />
                      </div>
                      {/* right */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                        }}
                      >
                        <BInput
                          disabled={true}
                          label={"Authentication"}
                          value={reportData.reportBy.status}
                          inputStyles={{ marginBottom: "2rem", width: "70%" }}
                        />
                      </div>
                    </div>
                  </BForm>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}

export default AdminReportProduct;
