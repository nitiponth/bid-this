import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query {
    me {
      username
    }
  }
`;

export const REQUEST_RECOVERY = gql`
  mutation ($email: String!, $callbackUrl: String!) {
    requestRecoverPassword(email: $email, callbackUrl: $callbackUrl)
  }
`;

export const RECOVERY_PASSWORD = gql`
  mutation ($newPassword: String!, $reNewPassword: String!, $token: String!) {
    recoverPassword(
      newPassword: $newPassword
      reNewPassword: $reNewPassword
      token: $token
    )
  }
`;
