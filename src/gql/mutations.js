import gql from 'graphql-tag';
import { FRAGMENT_GROUP_ALL_FIELDS } from './fragments';

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
  ${FRAGMENT_GROUP_ALL_FIELDS}
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($event: EventInput!) {
    createEvent(event: $event) {
      event {
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
