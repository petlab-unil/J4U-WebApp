import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;
