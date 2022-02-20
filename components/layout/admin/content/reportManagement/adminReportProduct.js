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
import styled from "styled-components";
import { COLOR } from "../../../../../utils/COLOR";

const ShortDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-height: 425px;
  min-width: 280px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.09);
  padding: 1rem 1rem;
  margin-bottom: 2rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  border-radius: 2rem;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  border-radius: 2rem;
`;

const ImagePagination = styled.div`
  margin: 1rem 0;
  display: flex;
  column-gap: 5px;
`;

const DotIndex = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.active ? COLOR.PRIMARY_YELLOW : COLOR.GRAY};

  &:hover {
    cursor: pointer;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const ProductTitle = styled.div`
  text-align: center;
  font-size: 1.8rem;
  color: ${COLOR.BLACK};
  margin-bottom: 0.25rem;
`;

const Seller = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${COLOR.DARKGRAY};
  margin-bottom: 1.5rem;
`;

const Description = styled.textarea`
  width: 90%;
  height: 120px;
  border: 2px solid ${COLOR.DARKGRAY};
  font-family: inherit;
  color: inherit;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${COLOR.GRAYLIGHT1};
  display: block;
  margin-bottom: 1rem;

  color: ${COLOR.GRAY};
  outline: none;

  box-sizing: border-box;
  padding: 1rem;
  resize: none;
`;

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
  const [imageIndex, setImageIndex] = useState(0);

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

  const totalImages = reportData?.product?.images.length;

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

              <ShortDetailContainer>
                <ImageContainer>
                  <StyledImage
                    src={reportData?.product?.images[imageIndex]}
                    width={300}
                    height={175}
                    objectFit={"cover"}
                  />
                </ImageContainer>
                <ImagePagination>
                  {new Array(totalImages).fill(0).map((dot, index) => (
                    <DotIndex
                      key={index}
                      active={index === imageIndex}
                      onClick={() => {
                        setImageIndex(index);
                      }}
                    />
                  ))}
                </ImagePagination>
                <ProductDetail>
                  <ProductTitle>{reportData.product.title}</ProductTitle>
                  <Seller>{reportData.product.seller.username}</Seller>
                  <Description
                    disable={true}
                    defaultValue={reportData.product.desc}
                  />
                </ProductDetail>
              </ShortDetailContainer>

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
                <div
                  className="RProduct__action"
                  style={{ transform: "translateY(-50px)" }}
                >
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
                  style={{ transform: "translateY(-20px)" }}
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
