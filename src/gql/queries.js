import gql from 'graphql-tag';
import * as fragments from './fragments';

export const ME = gql`
  query me {
    me {
      id
      email
      civilite
      firstName
      lastName
      birthDate
      verified
      role
      baselineLink
      formDone
      formDoneAt
      cohort {
        ...CohortAllFields
      }
      alpha
      beta
      oldJobIsco08
      oldJobTitle
      group {
        ...GroupAllFields
      }
    }
  }
  ${fragments.FRAGMENT_GROUP_ALL_FIELDS}
  ${fragments.FRAGMENT_COHORT_ALL_FIELDS}
`;

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      ...UserAllFields
    }
  }
  ${fragments.FRAGMENT_USER_ALL_FIELD}
`;

export const ALL_GROUPS = gql`
  query allGroups {
    allGroups {
      ...GroupAllFields
    }
  }
  ${fragments.FRAGMENT_GROUP_ALL_FIELDS}
`;

export const ALL_COHORTS = gql`
  query allCohorts {
    allCohorts {
      ...CohortAllFields
      users {
        id
        email
        group {
          id
          name
        }
        formDoneAt
      }
    }
  }
  ${fragments.FRAGMENT_COHORT_ALL_FIELDS}
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

export const JOB_SEARCH_HINTS = gql`
  query jobSearchHints($query: String!, $limit: Int!) {
    jobSearchHints(query: $query, limit: $limit) {
      id
      avam
      bfs
      isco08
      title
    }
  }
`;

export const RECOMMENDATIONS = gql`
  query recommendations(
    $oldJobIsco08: Int!
    $oldJobTitle: String!
    $alpha: Float!
    $beta: Float!
    $cantonCode: String!
  ) {
    recommendations(
      oldJobIsco08: $oldJobIsco08
      oldJobTitle: $oldJobTitle
      alpha: $alpha
      beta: $beta
      cantonCode: $cantonCode
    ) {
      varList
      results {
        jobTitle
        isco08
        avam
        bfs
        positionsCount
      }
    }
  }
`;

export const POSITIONS = gql`
  query positions($professionCodes: [Int]!, $cantonCode: CantonEnum!, $page: Int!) {
    positions(professionCodes: $professionCodes, cantonCode: $cantonCode, page: $page) {
      totalCount
      positions {
        id
        jobQuantity
        externalUrl
        company {
          name
          city
          street
          postalCode
          houseNumber
          countryCode
        }
        employment {
          startDate
          endDate
          immediately
          permanent
          workloadPercMin
          workloadPercMax
        }
        location {
          city
          countryCode
          cantonCode
        }
        contact {
          salutation
          firstName
          lastName
          phone
          email
        }
        descriptions {
          languageCode
          title
          description
        }
      }
    }
  }
`;

export const ALL_DATETIME_JOBS = gql`
  query allDatetimeJobs {
    allDatetimeJobs {
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
`;
