function Register() {
  return (
    <div className="register">
      <div className="close-btn">
        <img
          src="/images/SVG/cross.svg"
          alt="clost button"
          className="btn__close-img"
        />
      </div>

      <div className="register__logo">
        <div className="register__logo-box">
          <img
            src="/images/logo-land.png"
            alt="logo"
            className="register__logo-img"
          />
        </div>
        <h1 className="register__logo-text">Register</h1>
      </div>

      <div className="register__content">
        <form className="register__form">
          <label htmlFor="email" className="register__form--text">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className="register__form-input"
          />
          <label htmlFor="password" className="register__form--text">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="register__form-input"
          />
          <label htmlFor="re-password" className="register__form--text">
            Re-Password
          </label>
          <input
            id="re-password"
            type="password"
            placeholder="Re-Password"
            className="register__form-input"
          />
          <label htmlFor="username" className="register__form--text">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="register__form-input"
          />

          <div className="register__form--twocol">
            <div className="register__form--twocol-col">
              <label htmlFor="name" className="register__form--text">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Firstname"
                className="register__form-input"
              />
            </div>

            <div className="register__form--twocol-col">
              <label htmlFor="name" className="register__form--text">
                Lastname
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Lastname"
                className="register__form-input"
              />
            </div>
          </div>

          <label htmlFor="address" className="register__form--text">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="register__form-input"
          />
          <div className="register__form--twocol">
            <div className="register__form--twocol-col">
              <input
                id="province"
                type="text"
                placeholder="Province"
                className="register__form-input"
              />
            </div>

            <div className="register__form--twocol-col">
              <input
                id="postcode"
                type="number"
                placeholder="Postcode"
                className="register__form-input"
                minLength="5"
                maxLength="5"
              />
            </div>
          </div>

          <label htmlFor="Phone" className="register__form--text">
            Phone
          </label>
          <input
            id="phone"
            type="number"
            placeholder="Phone Number"
            className="register__form-input"
          />
          <div className="register__term">
            <input
              type="checkbox"
              id="accept"
              name="test"
              value="true"
              className="register__term-checkbox"
            />
            <label for="accept" className="register__term-text">
              I agree to BidThis's
              <a href="#" className="register__link register__link--sign">
                Terms of Use
              </a>
              and
              <a href="#" className="register__link register__link--sign">
                Privacy Policy
              </a>
            </label>
          </div>

          <button type="submit" className="register__btn">
            Register
          </button>
        </form>
      </div>
      <div className="register__footer">
        Already have an account?
        <a href="#" className="register__link register__link--sign">
          Sign in
        </a>
      </div>
    </div>
  );
}

export default Register;
