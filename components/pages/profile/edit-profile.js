import { useState, useCallback, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";

import { useS3Upload } from "next-s3-upload";
import Dropzone from "react-dropzone";
import AuthContext from "../../../store/auth-context";

const ME_QUERY = gql`
  query {
    me {
      name {
        first
        last
      }
      username
      address {
        home
        province
        postcode
      }
      desc
      profile
      cover
      kyc {
        idCard
        photo
      }
    }
  }
`;

const USER_UPDATED = gql`
  mutation (
    $updateUserFirst: String
    $updateUserLast: String
    $updateUserUsername: String
    $updateUserAddress: String
    $updateUserProvince: String
    $updateUserPostcode: String
    $updateUserDesc: String
    $updateUserProfile: String
    $updateUserCover: String
    $updateUserIdCard: String
    $updateUserPhoto: String
  ) {
    updateUser(
      first: $updateUserFirst
      last: $updateUserLast
      username: $updateUserUsername
      address: $updateUserAddress
      province: $updateUserProvince
      postcode: $updateUserPostcode
      desc: $updateUserDesc
      profile: $updateUserProfile
      cover: $updateUserCover
      idCard: $updateUserIdCard
      photo: $updateUserPhoto
    ) {
      id
      profile
      cover
      kyc {
        idCard
        photo
      }
    }
  }
`;

function EditProfile() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const [userData, setUserData] = useState();
  const [hasError, setHasError] = useState();

  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  const [updateUser] = useMutation(USER_UPDATED);

  let initialValues = {
    username: "",
    name: "",
    lastname: "",
    address: "",
    province: "",
    postcode: "",
    desc: "",
    profile: "",
    cover: "",
    idCard: "",
    photo: "",
  };

  useEffect(() => {
    if (loading === false && data) {
      if (data.me !== null) {
        console.log(data.me);
        setUserData(data.me);
        if (data.me.profile !== null) {
          setAvatarFiles({ url: data.me.profile });
        }
        if (data.me.cover !== null) {
          setCoverFiles({ url: data.me.cover });
        }
        if (data.me.kyc.idCard !== null) {
          setIdCardFiles({ url: data.me.kyc.idCard });
        }
        if (data.me.kyc.photo !== null) {
          setSelfieFiles({ url: data.me.kyc.photo });
        }
      }
    }
    if (error) {
      router.push("/");
    }
  }, [loading, data]);

  if (userData) {
    initialValues = {
      username: userData.username || "",
      name: userData.name.first || "",
      lastname: userData.name.last || "",
      address: userData.address.home || "",
      province: userData.address.province || "",
      postcode: userData.address.postcode ? userData.address.postcode : "",
      desc: userData.desc ? userData.desc : "",
      profile: userData.profile ? userData.profile : "",
      cover: userData.cover ? userData.cover : "",
      idCard: userData.kyc.idCard ? userData.kyc.idCard : "",
      photo: userData.photo ? userData.photo : "",
    };
  }

  const onSubmit = async (values) => {
    if (avatarFiles) {
      values.profile = avatarFiles.url;
    }
    if (coverFiles) {
      values.cover = coverFiles.url;
    }
    if (idCardFiles) {
      values.idCard = idCardFiles.url;
    }
    if (selfieFiles) {
      values.photo = selfieFiles.url;
    }

    if (!avatarFiles && initialValues.profile !== "") {
      values.profile = "";
    }
    if (!coverFiles && initialValues.cover !== "") {
      values.cover = "";
    }
    if (!idCardFiles && initialValues.idCard !== "") {
      values.idCard = "";
    }
    if (!selfieFiles && initialValues.photo !== "") {
      values.photo = "";
    }

    try {
      const modifierValues = {
        updateUserFirst:
          initialValues.name === values.name ? null : values.name,
        updateUserLast:
          initialValues.lastname === values.lastname ? null : values.lastname,
        updateUserUsername:
          initialValues.username === values.username ? null : values.username,
        updateUserAddress:
          initialValues.address === values.address ? null : values.address,
        updateUserProvince:
          initialValues.province === values.province ? null : values.province,
        updateUserPostcode:
          initialValues.postcode === values.postcode ? null : values.postcode,
        updateUserDesc: initialValues.desc === values.desc ? null : values.desc,
        updateUserProfile:
          initialValues.profile === values.profile ? null : values.profile,
        updateUserCover:
          initialValues.cover === values.cover ? null : values.cover,
        updateUserIdCard:
          initialValues.idCard === values.idCard ? null : values.idCard,
        updateUserPhoto:
          initialValues.photo === values.photo ? null : values.photo,
      };
      if (initialValues.username === values.username) {
        values.username = null;
      }

      const { data } = await updateUser({
        variables: modifierValues,
      });
      console.log(data);
      router.push(`/users/${authCtx.userId}`);
    } catch (e) {
      setHasError(e.message);
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  // const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const { uploadToS3 } = useS3Upload();
  const [avatarFiles, setAvatarFiles] = useState();

  const [coverFiles, setCoverFiles] = useState();
  const [idCardFiles, setIdCardFiles] = useState();
  const [selfieFiles, setSelfieFiles] = useState();

  async function avatarDeleteBtn() {
    setAvatarFiles();
  }

  function coverDeleteBtn() {
    setCoverFiles();
  }

  async function cardDeleteBtn() {
    setIdCardFiles();
  }

  function selfieDeleteBtn() {
    setSelfieFiles();
  }

  let avatarThumbs, coverThumbs, cardThumbs, selfThumbs;
  if (userData) {
    avatarThumbs = avatarFiles && (
      <div
        className="form__box-imagebox"
        key={avatarFiles.url.substring(64) || ""}
      >
        <div className="form__box-imagebox-box">
          <img src={avatarFiles.url} className="form__box-imagebox-img" />
        </div>
        <aside className="form__box-imagebox-aside">
          <div className="form__box-imagebox-filename">
            {avatarFiles.url.substring(64) || ""}
          </div>
          <button
            onClick={avatarDeleteBtn}
            className="form__box-imagebox-delete"
          >
            Delete
          </button>
        </aside>
      </div>
    );

    coverThumbs = coverFiles && (
      <div className="form__box-imagebox" key={coverFiles.url.substring(0, 64)}>
        <div className="form__box-imagebox-box">
          <img src={coverFiles.url} className="form__box-imagebox-img" />
        </div>
        <aside className="form__box-imagebox-aside">
          <div className="form__box-imagebox-filename">
            {coverFiles.url.substring(64)}
          </div>
          <button
            onClick={coverDeleteBtn}
            className="form__box-imagebox-delete"
          >
            Delete
          </button>
        </aside>
      </div>
    );

    cardThumbs = idCardFiles && (
      <div
        className="form__box-imagebox"
        key={idCardFiles.url ? idCardFiles.url.substring(0, 64) : "123"}
      >
        <div className="form__box-imagebox-box">
          <img src={idCardFiles.url} className="form__box-imagebox-img" />
        </div>
        <aside className="form__box-imagebox-aside">
          <div className="form__box-imagebox-filename">
            {idCardFiles.url ? idCardFiles.url.substring(0, 64) : ""}
          </div>
          <button onClick={cardDeleteBtn} className="form__box-imagebox-delete">
            Delete
          </button>
        </aside>
      </div>
    );
    selfThumbs = selfieFiles && (
      <div
        className="form__box-imagebox"
        key={selfieFiles.url ? selfieFiles.url.substring(0, 64) : "456"}
      >
        <div className="form__box-imagebox-box">
          <img src={selfieFiles.url} className="form__box-imagebox-img" />
        </div>
        <aside className="form__box-imagebox-aside">
          <div className="form__box-imagebox-filename">
            {selfieFiles.url ? selfieFiles.url.substring(0, 64) : ""}
          </div>
          <button
            onClick={selfieDeleteBtn}
            className="form__box-imagebox-delete"
          >
            Delete
          </button>
        </aside>
      </div>
    );
  }

  return (
    <div className="uf-container">
      <h1 className="title">Edit your Profile</h1>
      <form onSubmit={formik.handleSubmit}>
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
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Firstname"
                  className="input__form-input"
                />
                <label htmlFor="name" className="glabel glabel--form">
                  Lastname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
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
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
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
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                placeholder="Address (line 1)"
                className="input__form-input"
              />
              {/* <input
                id="address"
                type="text"
                placeholder="Address (line 2)"
                className="input__form-input"
              /> */}
              <div className="input__form--twocol">
                <div className="input__form--twocol-col">
                  <input
                    id="province"
                    name="province"
                    onChange={formik.handleChange}
                    value={formik.values.province}
                    type="text"
                    placeholder="Province"
                    className="input__form-input"
                  />
                </div>

                <div className="input__form--twocol-col">
                  <input
                    id="postcode"
                    name="postcode"
                    onChange={formik.handleChange}
                    value={formik.values.postcode}
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
                id="desc"
                name="desc"
                rows="10"
                onChange={formik.handleChange}
                value={formik.values.desc}
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
              {avatarFiles ? (
                <div>{avatarThumbs}</div>
              ) : (
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    let file = acceptedFiles[0];
                    uploadToS3(file)
                      .then((result) => {
                        setAvatarFiles({ url: result.url, key: result.key });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
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
              {coverFiles ? (
                <div>{coverThumbs}</div>
              ) : (
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    let file = acceptedFiles[0];
                    uploadToS3(file)
                      .then((result) => {
                        setCoverFiles({ url: result.url, key: result.key });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
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
                {idCardFiles ? (
                  <div>{cardThumbs}</div>
                ) : (
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      let file = acceptedFiles[0];
                      uploadToS3(file)
                        .then((result) => {
                          setIdCardFiles({ url: result.url, key: result.key });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
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
                {selfieFiles ? (
                  <div>{selfThumbs}</div>
                ) : (
                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      let file = acceptedFiles[0];
                      uploadToS3(file)
                        .then((result) => {
                          setSelfieFiles({ url: result.url, key: result.key });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
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
            <button type="submit" className="form__end-btn">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
