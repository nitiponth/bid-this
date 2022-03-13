import { useFormik } from "formik";
import Image from "next/image";
import styled from "styled-components";
import { COLOR } from "../../utils/COLOR";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REQUEST_RECOVERY } from "../../utils/networking/graphQL/auth";
import { useRouter } from "next/router";

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

  font-size: 1.8rem;
  padding: 0 1rem;
`;

export const SubmitButton = styled.button`
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

const RequestRecover = () => {
  const router = useRouter();
  const [requestRecovery] = useMutation(REQUEST_RECOVERY);

  const schema = Yup.object({
    email: Yup.string()
      .email("Please check the email format is correct.")
      .required("This field is required."),
  });

  const handleSubmit = async (values) => {
    const { email } = values;
    const callbackUrl = window.location.origin;

    await requestRecovery({
      variables: {
        email,
        callbackUrl,
      },
    });

    router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  const { email } = formik.errors;

  return (
    <ScreenContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormContainer>
          <Logo
            //   onClick={}
            src={require("../../public/images/logo-square.png")}
            width={150}
            height={150}
            objectFit="contain"
          />
          <Title>Recover Password</Title>

          <InputForm>
            <Label>Email Address</Label>
            <Input
              id="email"
              name="email"
              type={"email"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={email}
            />

            {!!email && <ErrorText>{email}</ErrorText>}
          </InputForm>

          <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
      </form>
    </ScreenContainer>
  );
};

export default RequestRecover;
