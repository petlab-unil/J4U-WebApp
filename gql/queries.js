import gql from 'graphql-tag';

export const ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const ALL_GROUPS = gql`
  query allGroups {
    allGroups {
      id
      name
      baselineId
      cruiserId
    }
  }
`;

export const GET_SIGNUP_LINK = gql`
  query getSignupLink($groupId: Int!, $expireAt: DateTime!) {
    getSignupLink(groupId: $groupId, expireAt: $expireAt) {
      url
      token
    }
  }
`;

export const ALL_SURVEYS = gql`
  query allSurveys {
    allSurveys {
      id
      name
      isActive
    }
  }
`;
