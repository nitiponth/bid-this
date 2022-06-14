import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Field, FormikProvider, useFormik } from "formik";
import { BiPlus } from "react-icons/bi";
import Dropzone from "react-dropzone";
import { useS3Upload } from "next-s3-upload";
import SelectionBox from "../../etc/selection/selection";
import Datetime from "react-datetime";
import AuthContext from "../../../store/auth-context";

import "react-datetime/css/react-datetime.css";
import BWaiting from "../../atoms/BWaiting/BWaiting";
import BLoading from "../../molecules/BLoading/BLoading";
import Head from "next/head";

const PRODUCT_QUERY = gql`
  query ($getProductByIdProductId: ID!) {
    getProductById(productId: $getProductByIdProductId) {
      category
      title
      condition
      desc
      start
      price {
        initial
        bidOffer
      }
      images
      shipping
      policy
      seller {
        id
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation (
    $updateProductProductId: ID!
    $updateProductCategory: Category
    $updateProductTitle: String
    $updateProductCondition: String
    $updateProductStart: ScalarDate
    $updateProductDesc: String
    $updateProductInitialPrice: Int
    $updateProductBidOffer: Int
    $updateProductImages: [String]
    $updateProductShipping: String
    $updateProductPolicy: [String]
  ) {
    updateProduct(
      productId: $updateProductProductId
      category: $updateProductCategory
      title: $updateProductTitle
      condition: $updateProductCondition
      start: $updateProductStart
      desc: $updateProductDesc
      initialPrice: $updateProductInitialPrice
      bidOffer: $updateProductBidOffer
      images: $updateProductImages
      shipping: $updateProductShipping
      policy: $updateProductPolicy
    ) {
      id
    }
  }
`;

function EditItem({ prodId }) {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const { uploadToS3 } = useS3Upload();

  const [activeWaitingModal, setActiveWatingModal] = useState(false);

  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    ssr: false,
    variables: {
      getProductByIdProductId: prodId,
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [imagesArray, setImagesArray] = useState([]);

  const categoryOptions = ["Clothing", "Electronics", "Figures", "Others"];
  const conditionOptions = [
    "New",
    "Used - Very Good",
    "Used - Good",
    "Used - Acceptable",
  ];
  const shippingOptions = [
    "Kerry Express",
    "J&T Express",
    "Flash Express",
    "Alpha Fast",
    "Ninja Van",
    "Thai Post (EMS)",
    "Thai Post (Register)",
    "Seller own fleet",
    "Others",
  ];

  const [selectedCate, setSelectedCate] = useState("Select Category");
  const [selectedCon, setSelectedCon] = useState("Select Condition");
  const [selectedShip, setSelectedShip] = useState("Select Shipping Company");
  const [fetchShip, setFetchShip] = useState();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 3);
  const [selectedDate, setSelectedDate] = useState(currentTime);

  function imageDeleteBtn(deleteUrl) {
    setImagesArray((prev) => prev.filter((url) => url !== deleteUrl));
  }

  const [hasError, setHasError] = useState();
  const [overTime, setOverTime] = useState(false);

  useEffect(() => {
    if (loading === false && data) {
      if (data.getProductById !== null) {
        if (data.getProductById.seller.id !== authCtx.user.id) {
          router.push(`/`);
          return;
        }
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 1);
        if (currentTime >= data.getProductById.start) {
          console.log("can not edit on this product");
          setOverTime(true);
          setHasError(
            "Unable to edit product information near the auction time"
          );
          router.push(`/items/${prodId}`);
        }
        setSelectedCate(data.getProductById.category);
        setSelectedCon(data.getProductById.condition);
        const startTime = new Date(data.getProductById.start);
        setSelectedDate(startTime);
        if (!shippingOptions.includes(data.getProductById.shipping)) {
          setFetchShip("Others");
          setSelectedShip("Others");
        } else {
          setSelectedShip(data.getProductById.shipping);
        }
        setImagesArray(data.getProductById.images);
        setIsLoadingScreen(false);
      }
    }
    if (error) {
      router.push("/");
    }
  }, [loading, data]);

  let valuePolicy;
  let othersPolicy = null;
  let ship = null;

  if (data) {
    othersPolicy = data.getProductById.policy.find(
      (policy) =>
        policy !== "15 days warranty by seller" &&
        policy !== "7 days return to seller"
    );

    if (othersPolicy) {
      valuePolicy = data.getProductById.policy.filter(
        (policy) => policy !== othersPolicy
      );
    } else {
      valuePolicy = data.getProductById.policy;
    }

    if (fetchShip === "Others") {
      ship = data.getProductById.shipping;
    }
  }

  let initialValues = {
    category: data ? data.getProductById.category : "",
    productName: data ? data.getProductById.title : "",
    condition: data ? data.getProductById.condition : "",
    productDetails: data ? data.getProductById.desc : "",
    auctionTime: data ? data.getProductById.start : "",
    reservePrice: data ? data.getProductById.price.initial : 0,
    bidOffer: data ? data.getProductById.price.bidOffer : 0,
    productImages: data ? data.getProductById.images : [],
    shipCompany: fetchShip ? "Others" : data && data.getProductById.shipping,
    otherShip: ship ? ship : "",
    policy: valuePolicy,
    customPolicy: othersPolicy ? othersPolicy : "",
  };

  const validate = (values) => {
    setHasError();
    if (selectedCate === "Select Category") {
      setHasError("Seller need to select product category.");
      return false;
    }

    if (values.productName.length < 3) {
      setHasError("A product name of at least 3 characters is required.");
      return false;
    }

    if (selectedCon === "Select Condition") {
      setHasError("Seller need to select condition of product.");
      return false;
    }

    if (
      !values.reservePrice ||
      values.reservePrice === 0 ||
      values.reservePrice === ""
    ) {
      setHasError("Reserve price must not be 0 or null");
      return false;
    }

    if (!values.bidOffer || values.bidOffer === 0 || values.bidOffer === "") {
      setHasError("Bid offer price must not be 0 or null");
      return false;
    }

    const checkTime = new Date();
    checkTime.setHours(checkTime.getHours() + 1);
    if (selectedDate < checkTime) {
      setHasError(
        "The time must be set at least 1 hours from the current time."
      );

      return false;
    }

    const checkDate = new Date();
    checkDate.setDate(checkDate.getDate + 7);
    if (selectedDate > checkDate) {
      setHasError("Auction cannot be scheduled more than 1 week");
      return false;
    }

    if (values.productDetails.length < 10) {
      setHasError(
        "A product description of at least 10 characters is required."
      );
      return false;
    }
    if (
      selectedShip === "Others" ||
      selectedShip === "Select Shipping Company"
    ) {
      if (!values.otherShip || values.otherShip === "") {
        setHasError("Shipping company name is required.");
        return false;
      }
    }

    if (imagesArray.length === 0) {
      setHasError("At least one product photo is required.");
      return false;
    }
  };

  const onSubmit = async (values) => {
    if (hasError) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    let modPolicy = values.policy;
    if (values.customPolicy && values.customPolicy.trim !== "") {
      modPolicy = [...values.policy, values.customPolicy];
    }

    if (othersPolicy) {
      if (!values.customPolicy) {
        modPolicy = values.policy;
      }
    }

    const time = new Date(selectedDate);
    time.setSeconds(0, 0);

    let shipCom = selectedShip;
    if (selectedShip === "Others") {
      shipCom = values.otherShip;
    }

    const modifierValues = {
      updateProductProductId: prodId,
      updateProductCategory:
        initialValues.category === selectedCate ? null : selectedCate,
      updateProductTitle:
        initialValues.productName === values.productName
          ? null
          : values.productName,
      updateProductCondition:
        initialValues.condition === selectedCon ? null : selectedCon,
      updateProductStart:
        Date.parse(initialValues.auctionTime) === Date.parse(selectedDate)
          ? null
          : time,
      updateProductDesc:
        initialValues.productDetails === values.productDetails
          ? null
          : values.productDetails,
      updateProductInitialPrice:
        initialValues.reservePrice === values.reservePrice
          ? null
          : values.reservePrice,
      updateProductBidOffer:
        initialValues.bidOffer === values.bidOffer ? null : values.bidOffer,
      updateProductImages:
        initialValues.productImages === imagesArray ? null : imagesArray,
      updateProductShipping:
        initialValues.shipCompany === shipCom ? null : shipCom,
      updateProductPolicy: modPolicy,
    };
    console.log(modifierValues);

    const { data, errors } = await updateProduct({
      variables: modifierValues,
    });

    if (data) {
      router.push(`/items/${prodId}`);
    }

    if (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  const productsThumbs = imagesArray.map((url, index) => (
    <div
      className="form__box-imagebox u-margin-bottom-extra-small"
      key={url.substring(64) || ""}
    >
      <div className="form__box-imagebox-box">
        <img src={url} className="form__box-imagebox-img" />
      </div>
      <aside className="form__box-imagebox-aside">
        <div className="form__box-imagebox-filename">
          {url.substring(64) || ""}
        </div>
        <button
          onClick={() => imageDeleteBtn(url)}
          className="form__box-imagebox-delete"
        >
          Delete
        </button>
      </aside>
    </div>
  ));

  let submitClassname = "form__end-btn";
  if (overTime) {
    submitClassname = "form__end-btn form__end-btn--disabled";
  }

  return (
    <>
      {isLoadingScreen ? (
        <BLoading />
      ) : (
        <Fragment>
          <Head>
            <title>Edit your product detail</title>
            <meta
              name="description"
              content="A clear product description will increase the credibility of your product."
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="uf-container">
            <BWaiting
              active={activeWaitingModal}
              onClose={() => {}}
              canClose={false}
            />
            <h1 className="title">
              Editing at {data && data.getProductById.title}
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-container">
                {hasError && (
                  <div className="register__errors register__errors--edit">
                    {hasError}
                  </div>
                )}

                <div className="form__box">
                  <div className="form__box-title">Enter Product details.</div>
                  <div className="form__box-input">
                    <div className="input__form">
                      <label htmlFor="name" className="glabel glabel--form">
                        Category
                      </label>
                      <SelectionBox
                        options={categoryOptions}
                        selected={selectedCate}
                        setSelected={setSelectedCate}
                      />
                      <label
                        htmlFor="productName"
                        className="glabel glabel--form"
                      >
                        Product name
                      </label>
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        required={true}
                        placeholder="Product name"
                        className="input__form-input"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                      />

                      <label
                        htmlFor="condition"
                        className="glabel glabel--form"
                      >
                        Product Condition
                      </label>
                      <SelectionBox
                        options={conditionOptions}
                        selected={selectedCon}
                        setSelected={setSelectedCon}
                      />
                      <label
                        htmlFor="productDetails"
                        className="glabel glabel--form u-margin-top-small u-margin-bottom-extra-small"
                      >
                        Product details
                      </label>
                      <div className="form__box-input">
                        <textarea
                          id="productDetails"
                          name="productDetails"
                          rows="5"
                          className="input__form-textarea"
                          placeholder="Enter a description about your product"
                          spellCheck="false"
                          value={formik.values.productDetails}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form__box">
                  <div className="form__box-title">
                    Enter Auction Information
                  </div>
                  <div className="form__box-input">
                    <label htmlFor="datePicker" className="glabel glabel--form">
                      Auction Time
                    </label>
                    <Datetime
                      inputProps={{ className: "datetime" }}
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      timeFormat="HH:mm"
                      timeConstraints={{
                        hours: { min: 0, max: 23 },
                        minutes: { min: 0, max: 59 },
                      }}
                    />
                    <label
                      htmlFor="reservePrice"
                      className="glabel glabel--form"
                    >
                      Reserve price
                    </label>
                    <div className="input__form-box u-margin-bottom-small">
                      ฿
                      <input
                        id="reservePrice"
                        type="number"
                        placeholder="Reserve price (included delivery fee)"
                        className="input__form-input input__form-input--username"
                        value={formik.values.reservePrice}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <label htmlFor="bidOffer" className="glabel glabel--form">
                      Bid Offer
                    </label>
                    <div className="input__form-box u-margin-bottom-small">
                      <BiPlus />
                      <input
                        id="bidOffer"
                        type="number"
                        placeholder="Bid offer"
                        className="input__form-input input__form-input--username"
                        value={formik.values.bidOffer}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form__box">
                  <div className="form__box-title">
                    Upload products images
                    <div className="form__box-subtitle">
                      Recommended size: 1000x1000px. JPG, JPEG or PNG.
                    </div>
                  </div>
                  <div className="form__box-input">
                    {imagesArray.length != 0 && (
                      <div className="u-margin-bottom-extra-small">
                        {productsThumbs}
                      </div>
                    )}
                    <Dropzone
                      multiple={true}
                      onDrop={async (acceptedFiles) => {
                        setActiveWatingModal(true);
                        const urls = [];

                        let files = Array.from(acceptedFiles);

                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          const { url } = await uploadToS3(file);
                          urls.push(url);
                        }

                        setImagesArray((prev) => [...prev, ...urls]);
                        setActiveWatingModal(false);
                      }}
                      accept={".jpg, .png, .jpeg"}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps({ className: "form__box-dropbox" })}
                        >
                          <input {...getInputProps()} />
                          <p className="input__form-istext">
                            Drag and drop an image here, or click to browse.
                          </p>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>
                <div className="form__box">
                  <div className="form__box-title">
                    Enter Shipping Information
                  </div>
                  <div className="form__box-input">
                    <div className="input__form">
                      <label htmlFor="name" className="glabel glabel--form">
                        Shipping Company
                      </label>
                      <SelectionBox
                        options={shippingOptions}
                        selected={
                          !shippingOptions.includes(selectedShip)
                            ? fetchShip
                            : selectedShip
                        }
                        setSelected={setSelectedShip}
                      />
                      {selectedShip === "Others" && (
                        <Fragment>
                          <label
                            htmlFor="OthersShip"
                            className="glabel glabel--form"
                          >
                            Company name
                          </label>
                          <input
                            id="otherShip"
                            name="otherShip"
                            type="text"
                            placeholder="Shipping Company"
                            className="input__form-input"
                            value={formik.values.otherShip}
                            onChange={formik.handleChange}
                          />
                        </Fragment>
                      )}

                      {/* <label htmlFor="shipCost" className="glabel glabel--form">
                  Shipping Cost
                </label>
                <div className="input__form-box u-margin-bottom-small">
                  ฿
                  <input
                    id="shipCost"
                    type="number"
                    placeholder="Shipping Cost"
                    className="input__form-input input__form-input--username"
                    value={formik.values.shipCost}
                    onChange={formik.handleChange}
                  />
                </div> */}
                    </div>
                  </div>
                </div>
                <div className="form__box">
                  <div className="form__box-title">After-sales Warranty</div>
                  <div className="form__box-input">
                    <div className="input__form">
                      <label htmlFor="name" className="glabel glabel--form">
                        Warranty Policy
                      </label>
                      <div id="policy-checkbox">
                        <div
                          role="group"
                          aria-labelledby="policy-checkbox"
                          className="checkbox"
                        >
                          <FormikProvider value={formik}>
                            <label className="checkbox__item">
                              <Field
                                name="policy"
                                type="checkbox"
                                value="7 days return to seller"
                                className="checkbox__box"
                              />
                              7 days return to seller
                            </label>
                            <label className="checkbox__item">
                              <Field
                                name="policy"
                                type="checkbox"
                                value="15 days warranty by seller"
                                className="checkbox__box"
                              />
                              15 days warranty by seller
                            </label>
                          </FormikProvider>
                          <label
                            htmlFor="othersPolicy"
                            className="glabel glabel--form u-margin-top-small "
                          >
                            Others Warranty Policy
                          </label>
                          <input
                            id="customPolicy"
                            name="customPolicy"
                            type="text"
                            placeholder="Warranty Policy"
                            className="input__form-input"
                            value={formik.values.customPolicy}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form__end u-padding-top-medium">
                  <button type="submit" className={submitClassname}>
                    Post Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      )}
    </>
  );
}

export default EditItem;
