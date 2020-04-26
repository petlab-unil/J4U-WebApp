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

export const UPDATE_GROUP_CONFIG = gql`
  mutation UpdateGroupConfig($groupId: ID!, $groupData: GroupInput!) {
    updateGroupConfig(groupId: $groupId, groupData: $groupData) {
      group {
        id
        name
        baselineId
        cruiserId
      }
    }
  }
`;
