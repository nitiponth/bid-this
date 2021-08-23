import { useState, useCallback, useEffect } from "react";

import Dropzone, { useDropzone } from "react-dropzone";

function EditProfile() {
  const [imgFiles, setImgFiles] = useState([]);
  const [covFiles, setCovFiles] = useState([]);

  function imgDeleteBtn(params) {
    setImgFiles([]);
  }
  function covDeleteBtn(params) {
    setCovFiles([]);
  }

  const imgThumbs = imgFiles.map((file) => (
    <div className="form__box-imagebox" key={file.name}>
      <div className="form__box-imagebox-box">
        <img src={file.preview} className="form__box-imagebox-img" />
      </div>
      <aside className="form__box-imagebox-aside">
        <div className="form__box-imagebox-filename">{file.name}</div>
        <button onClick={imgDeleteBtn} className="form__box-imagebox-delete">
          Delete
        </button>
      </aside>
    </div>
  ));

  const covThumbs = covFiles.map((file) => (
    <div className="form__box-imagebox" key={file.name}>
      <div className="form__box-imagebox-box">
        <img src={file.preview} className="form__box-imagebox-img" />
      </div>
      <aside className="form__box-imagebox-aside">
        <div className="form__box-imagebox-filename">{file.name}</div>
        <button onClick={covDeleteBtn} className="form__box-imagebox-delete">
          Delete
        </button>
      </aside>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      imgFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      covFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [imgFiles, covFiles]
  );

  return (
    <div className="uf-container">
      <h1 className="title">Edit your Profile</h1>
      <form>
        <div className="form-container">
          <div className="form__box">
            <div className="form__box-title">Enter your details.</div>
            <div className="form__box-input">
              <div className="input__form">
                <label htmlFor="name" className="glabel glabel--form">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Firstname"
                  className="input__form-input"
                />
                <label htmlFor="name" className="glabel glabel--form">
                  Lastname
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Lastname"
                  className="input__form-input"
                />
                <label htmlFor="username" className="glabel glabel--form">
                  Username
                </label>
                <div className="input__form-box ">
                  @
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="input__form-input input__form-input--username"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form__box">
            <div className="form__box-title">Enter your delivery address.</div>
            <div className="form__box-input">
              <label htmlFor="address" className="glabel glabel--form">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Address (line 1)"
                className="input__form-input"
              />
              <input
                id="address"
                type="text"
                placeholder="Address (line 2)"
                className="input__form-input"
              />
              <div className="input__form--twocol">
                <div className="input__form--twocol-col">
                  <input
                    id="province"
                    type="text"
                    placeholder="Province"
                    className="input__form-input"
                  />
                </div>

                <div className="input__form--twocol-col">
                  <input
                    id="postcode"
                    type="number"
                    placeholder="Postcode"
                    className="input__form-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form__box">
            <div className="form__box-title">
              Add a short description about yourself.
            </div>
            <div className="form__box-input">
              <textarea
                name="desc"
                rows="10"
                className="input__form-textarea"
                placeholder="Enter a short description about yourself"
                spellCheck="false"
              />
            </div>
          </div>
          <div className="form__box">
            <div className="form__box-title">
              Upload a profile image.
              <div className="form__box-subtitle">
                Recommended size: 1000x1000px. JPG, JPEG or PNG. 10MB max size.
              </div>
            </div>
            <div className="form__box-input">
              {imgFiles.length != 0 ? (
                <div>{imgThumbs}</div>
              ) : (
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setImgFiles(
                      acceptedFiles.map((file) =>
                        Object.assign(file, {
                          preview: URL.createObjectURL(file),
                        })
                      )
                    );
                  }}
                  accept={"image/jpeg, image/jpg, image/png"}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "form__box-dropbox" })}>
                      <input {...getInputProps()} />
                      <p className="input__form-istext">
                        Drag and drop an image here, or click to browse.
                      </p>
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
          </div>
          <div className="form__box">
            <div className="form__box-title">
              Upload a cover image
              <div className="form__box-subtitle">
                Recommended size: 1500x500px. JPG, JPEG or PNG. 10MB max size.
              </div>
            </div>
            <div className="form__box-input">
              {covFiles.length != 0 ? (
                <div>{covThumbs}</div>
              ) : (
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setCovFiles(
                      acceptedFiles.map((file) =>
                        Object.assign(file, {
                          preview: URL.createObjectURL(file),
                        })
                      )
                    );
                  }}
                  accept={"image/jpeg, image/jpg, image/png"}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "form__box-dropbox" })}>
                      <input {...getInputProps()} />
                      <p className="input__form-istext">
                        Drag and drop an image here, or click to browse.
                      </p>
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
          </div>
          <div className="form__box">
            <div className="form__box-title">
              Verify your profile
              <img
                src="/images/ios-icon/check.png"
                alt="verify mark"
                className="form__box-mark"
              />
              <div className="form__box-subtitle">
                Show the BidThis community that your profile is authentic.
              </div>
            </div>
            <div className="form__box-input">
              <div className="form__box-title form__box-title--sm">
                KYC Verification
              </div>
              <div className="form__box-dropzone">
                {covFiles.length != 0 ? (
                  <div>{covThumbs}</div>
                ) : (
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setCovFiles(
                        acceptedFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          })
                        )
                      );
                    }}
                    accept={"image/jpeg, image/jpg, image/png"}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({ className: "form__box-dropbox" })}
                      >
                        <input {...getInputProps()} />
                        <p className="input__form-istext">
                          Place a photo of your ID card here.
                        </p>
                      </div>
                    )}
                  </Dropzone>
                )}
              </div>
              <div className="form__box-dropzone">
                {covFiles.length != 0 ? (
                  <div>{covThumbs}</div>
                ) : (
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setCovFiles(
                        acceptedFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file),
                          })
                        )
                      );
                    }}
                    accept={"image/jpeg, image/jpg, image/png"}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({ className: "form__box-dropbox" })}
                      >
                        <input {...getInputProps()} />
                        <p className="input__form-istext">
                          Place a photo of yourself along with your ID card
                          here.
                        </p>
                      </div>
                    )}
                  </Dropzone>
                )}
              </div>
              <div className="form__box-title form__box-title--sm u-margin-bottom-small u-padding-top-tiny">
                Email Verification
              </div>
              <div className="input__form-request">
                <button type="button" className="input__form-request-btn">
                  Request New Email Verification.
                </button>
              </div>
            </div>
          </div>
          <div className="form__end u-padding-top-medium">
            <button className="form__end-btn">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
