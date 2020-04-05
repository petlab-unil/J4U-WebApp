import gql from 'graphql-tag';

export const AUTH = gql`
  mutation Auth($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      verified
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!, $token: String!) {
    createUser(user: $user, token: $token) {
      user {
        id
        email
        verified
      }
    }
  }
`;
