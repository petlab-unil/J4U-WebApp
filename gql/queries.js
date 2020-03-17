import gql from "graphql-tag";

export const APP_MSGS = gql`
  {
    appMessages @client {
      messages {
        id
        message
        code
        type
      }
    }
  }
`;
