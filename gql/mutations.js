import gql from "graphql-tag";

export const AUTH = gql`
  mutation Auth($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const PUSH_MSG = gql`
  mutation PushMessage($appMessage: AppMessage!) {
    pushMessage(appMessage: $appMessage) @client
  }
`;

export const DEL_MSG = gql`
  mutation DelMessage($id: Int!) {
    delMessage(id: $id) @client
  }
`;
