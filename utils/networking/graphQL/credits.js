import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query ($offset: Int) {
    getTransactionsByUserId(offset: $offset) {
      data {
        _id
        tranId
        status
        type
        createdAt
        amount
        product {
          id
          title
        }
      }
      metadata {
        count
        current
        limit
        offset
      }
    }
  }
`;

export const CARDS_QUERY = gql`
  query {
    me {
      wallet
      cards {
        id
        cardInfo {
          id
          expiration_month
          expiration_year
          last_digits
          brand
        }
      }
      bankAccounts {
        id
        bankInfo {
          id
          name
          last_digits
          brand
          active
        }
      }
    }
  }
`;

export const UPDATE_REP = gql`
  mutation {
    updateRepActive
  }
`;

export const UPDATE_TRANSACTIONS = gql`
  mutation {
    updateTransactions
  }
`;
