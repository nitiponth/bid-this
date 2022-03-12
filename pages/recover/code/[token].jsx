import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { COLOR } from "../../../utils/COLOR";
import * as Yup from "yup";

const ScreenContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLOR.OFFWHITE};
  width: 50rem;
  border-radius: 2rem;
  padding: 2rem 7.5rem;
  box-shadow: ${COLOR.SHADOW1};
`;

const Logo = styled(Image)`
  object-fit: contain;
`;

const Title = styled.h1`
  letter-spacing: 1px;
  font-size: 3rem;
  color: ${COLOR.DARKGRAY};
  margin-bottom: 4rem;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  font-size: 1.5rem;
  align-self: flex-start;
`;

const ErrorText = styled.div`
  font-size: 1.3rem;
  color: ${COLOR.PINK};
  align-self: flex-start;
`;

const Input = styled.input`
  width: 100%;
  height: 4rem;
  border-radius: 1rem;
  border: ${(props) => (props.error ? `2px solid #FF527A` : "none")};
  outline: none;

  background-color: #eee;

  font-size: 2.5rem;
  padding: 0 1rem;
`;

const SubmitButton = styled.button`
  width: 10rem;
  height: 4.5rem;
  background-color: ${COLOR.PRIMARY_YELLOW};
  border: none;
  border-radius: 1rem;

  margin-top: 4rem;

  transition: all 0.25s;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const RecoverPasswordPage = () => {
  const router = useRouter();

  const { token } = router.query;

  const schema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Must be 6 characters or less")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    reNewPassword: Yup.string()
      .min(6, "Must be 6 characters or less")
      .required("Please retype your password.")
      .oneOf([Yup.ref("newPassword")], "Your passwords do not match."),
  });

  const handleSubmit = (values) => {
    console.log("clicked");
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      reNewPassword: "",
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  const { newPassword, reNewPassword } = formik.errors;

  return (
    <ScreenContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormContainer>
          <Logo
            src={require("../../../public/images/logo-square.png")}
            width={150}
            height={150}
            objectFit="contain"
          />
          <Title>Reset Password</Title>

          <InputForm>
            <Label>New password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={"password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              error={newPassword}
            />

            {!!newPassword && <ErrorText>{newPassword}</ErrorText>}
          </InputForm>
          <InputForm>
            <Label>New password confirmation</Label>
            <Input
              id="reNewPassword"
              name="reNewPassword"
              type={"password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reNewPassword}
              error={reNewPassword}
            />
            {!!reNewPassword && <ErrorText>{reNewPassword}</ErrorText>}
          </InputForm>
          <SubmitButton type="submit">sdsds</SubmitButton>
        </FormContainer>
      </form>
    </ScreenContainer>
  );
};

export default RecoverPasswordPage;
