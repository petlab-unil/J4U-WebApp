import gql from 'graphql-tag';
import * as fragments from './fragments';

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
        ...GroupAllFields
      }
    }
  }
  ${fragments.FRAGMENT_GROUP_ALL_FIELDS}
`;

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($activity: ActivityInput!) {
    createActivity(activity: $activity) {
      activity {
        id
        type
        timestamp
        ip
        user {
          id
          email
        }
        userAgent
        payload
      }
    }
  }
`;

export const CREATE_DATETIME_JOB = gql`
  mutation CreateDatetimeJob($datetimeJob: DatetimeJobInput!) {
    createDatetimeJob(datetimeJob: $datetimeJob) {
      datetimeJob {
        id
        name
        action
        params
        state
        creationDate
        executionDate
        executedDate
      }
    }
  }
`;

export const DELETE_DATETIME_JOB = gql`
  mutation DeleteDatetimeJob($id: ID!) {
    deleteDatetimeJob(id: $id) {
      ok
    }
  }
`;

export const CREATE_COHORT = gql`
  mutation CreateCohort($cohortData: CohortInput!) {
    createCohort(cohortData: $cohortData) {
      cohort {
        ...CohortAllFields
      }
    }
  }
  ${fragments.FRAGMENT_COHORT_ALL_FIELDS}
`;

export const UPDATE_COHORT = gql`
  mutation UpdateCohort($cohortId: ID!, $cohortData: CohortInput!) {
    updateCohort(cohortId: $cohortId, cohortData: $cohortData) {
      cohort {
        ...CohortAllFields
      }
    }
  }
  ${fragments.FRAGMENT_COHORT_ALL_FIELDS}
`;

export const RESET_PASSWROD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      ok
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($token: String!, $password: String!) {
    updatePassword(token: $token, password: $password) {
      ok
    }
  }
`;
