import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { COLOR } from "../../../utils/COLOR";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { RECOVERY_PASSWORD } from "../../../utils/networking/graphQL/auth";
import { useState } from "react";
import BConfirm from "../../../components/atoms/BConfirm/BConfirm";

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
  min-width: 10rem;
  height: 4.5rem;
  padding: 0 2rem;
  background-color: ${COLOR.PRIMARY_YELLOW};
  border: none;
  border-radius: 1rem;

  margin-top: 4rem;

  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:active {
    cursor: pointer;
    transform: translateY(1px);
  }
`;

const RecoverPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [errors, setErrors] = useState();
  const [recoverPassword] = useMutation(RECOVERY_PASSWORD);

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

  const handleSubmit = async (values) => {
    try {
      const { newPassword, reNewPassword } = values;
      const { data } = await recoverPassword({
        variables: {
          newPassword,
          reNewPassword,
          token,
        },
      });

      if (data) {
        router.replace("/");
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  const onCloseHandler = async () => {
    setErrors();
    router.replace("/");
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
      <BConfirm
        active={!!errors}
        title={"An error occurred!"}
        body={errors}
        confirmOnly
        confirmText={"Ok"}
        onConfirm={onCloseHandler}
        onClose={onCloseHandler}
      />
      <form onSubmit={formik.handleSubmit}>
        <FormContainer>
          <Logo
            src={require("../../../public/images/logo-square.png")}
            width={150}
            height={150}
            objectFit="contain"
          />
          <Title>Change Password</Title>

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
          <SubmitButton type="submit">Change Password</SubmitButton>
        </FormContainer>
      </form>
    </ScreenContainer>
  );
};

export default RecoverPasswordPage;
