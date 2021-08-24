import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { BiPlus } from "react-icons/bi";
import Dropzone from "react-dropzone";
import SelectionBox from "../../etc/selection/selection";
import Datetime from "react-datetime";

import "react-datetime/css/react-datetime.css";
function AddProduct() {
  const categoryOptions = ["Clothing", "Games", "Figures", "Others"];
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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [productsFiles, setProductsFiles] = useState([]);

  //   console.log(productsFiles.map((file) => file.name));

  function productsDeleteBtn(name) {
    setProductsFiles((prevProductsFiles) =>
      prevProductsFiles.filter((file) => file.name !== name)
    );
  }

  const productsThumbs = productsFiles.map((file, index) => (
    <div
      className="form__box-imagebox u-margin-bottom-extra-small"
      key={file.name}
    >
      <div className="form__box-imagebox-box">
        <img src={file.preview} className="form__box-imagebox-img" />
      </div>
      <aside className="form__box-imagebox-aside">
        <div className="form__box-imagebox-filename">{file.name}</div>
        <button
          onClick={() => productsDeleteBtn(file.name)}
          className="form__box-imagebox-delete"
        >
          Delete
        </button>
      </aside>
    </div>
  ));

  return (
    <div className="uf-container">
      <h1 className="title">Add your Product</h1>
      <Formik
        initialValues={{
          category: "",
          productName: "",
          condition: "",
          productDetails: "",
          auctionTime: "",
          reservePrice: 0,
          currentPrice: 0,
          bidOffer: 0,
          productImages: [],
          shipCompany: "",
          shipCost: 0,
          checked: [],
        }}
        onSubmit={(values) => {
          values.category = selectedCate;
          values.condition = selectedCon;
          values.auctionTime = selectedDate;
          values.productImages = productsFiles;
          values.shipCompany = selectedShip;
          alert(JSON.stringify({ values }, null, 2));
          console.log(JSON.stringify({ values }, null, 2));
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-container">
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
                      type="text"
                      placeholder="Product name"
                      className="input__form-input"
                      value={values.productName}
                      onChange={handleChange}
                    />

                    <label htmlFor="condition" className="glabel glabel--form">
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
                        value={values.productDetails}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form__box">
                <div className="form__box-title">Enter Auction Information</div>
                <div className="form__box-input">
                  <label htmlFor="datePicker" className="glabel glabel--form">
                    Auction Time
                  </label>
                  <Datetime
                    inputProps={{ className: "datetime" }}
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    locale="ict"
                    timeFormat="HH:mm"
                    timeConstraints={{
                      hours: { min: 0, max: 23 },
                      minutes: { min: 0, max: 59 },
                    }}
                  />
                  <label htmlFor="reservePrice" className="glabel glabel--form">
                    Reserve price
                  </label>
                  <div className="input__form-box u-margin-bottom-small">
                    ฿
                    <input
                      id="reservePrice"
                      type="number"
                      placeholder="Reserve price"
                      className="input__form-input input__form-input--username"
                      value={values.reservePrice}
                      onChange={handleChange}
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
                      value={values.bidOffer}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form__box">
                <div className="form__box-title">
                  Upload products images
                  <div className="form__box-subtitle">
                    Recommended size: 1000x1000px. JPG, JPEG or PNG. 10MB max
                    size.
                  </div>
                </div>
                <div className="form__box-input">
                  {productsFiles.length != 0 && (
                    <div className="u-margin-bottom-extra-small">
                      {productsThumbs}
                    </div>
                  )}
                  <Dropzone
                    multiple={true}
                    onDrop={(acceptedFiles) => {
                      const newFiles = acceptedFiles.map((file) =>
                        Object.assign(file, {
                          preview: URL.createObjectURL(file),
                        })
                      );
                      if (productsFiles.length == 0) {
                        setProductsFiles(newFiles);
                      } else {
                        setProductsFiles((prevProductsFiles) => [
                          ...prevProductsFiles,
                          ...newFiles,
                        ]);
                      }
                    }}
                    accept={"image/jpeg, image/jpg, image/png"}
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
                      selected={selectedShip}
                      setSelected={setSelectedShip}
                    />

                    <label htmlFor="shipCost" className="glabel glabel--form">
                      Shipping Cost
                    </label>
                    <div className="input__form-box u-margin-bottom-small">
                      ฿
                      <input
                        id="shipCost"
                        type="number"
                        placeholder="Shipping Cost"
                        className="input__form-input input__form-input--username"
                        value={values.shipCost}
                        onChange={handleChange}
                      />
                    </div>
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
                        <label className="checkbox__item">
                          <Field
                            type="checkbox"
                            name="checked"
                            value="7 days return to seller"
                            className="checkbox__box"
                          />
                          7 days return to seller
                        </label>
                        <label className="checkbox__item">
                          <Field
                            type="checkbox"
                            name="checked"
                            value="15 days warranty by seller"
                            className="checkbox__box"
                          />
                          15 days warranty by seller
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form__end u-padding-top-medium">
                <button type="submit" className="form__end-btn">
                  Post Product
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddProduct;