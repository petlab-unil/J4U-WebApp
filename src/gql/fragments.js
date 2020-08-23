import gql from 'graphql-tag';

export const FRAGMENT_GROUP_ALL_FIELDS = gql`
  fragment GroupAllFields on Group {
    id
    name
    baselineId
    cruiserId
  }
`;

export const FRAGMENT_COHORT_ALL_FIELDS = gql`
  fragment CohortAllFields on Cohort {
    id
    groupId
    name
    cohortStart
    cohortEnd
    search
    recommendations
    alphaFixed
    betaFixed
  }
`;

export const FRAGMENT_USER_ALL_FIELD = gql`
  fragment UserAllFields on User {
    id
    firstName
    lastName
    civilite
    birthDate
    email
    phone
    role
    surveyId
    verified
    alpha
    beta
    oldJobIsco08
    oldJobTitle
    formDone
    formDoneAt
    cohort {
      ...CohortAllFields
    }
    features {
      id
      value
      featureConfig {
        id
        qualtricsName
        engineName
      }
    }
    group {
      id
      name
    }
  }
  ${FRAGMENT_COHORT_ALL_FIELDS}
`;
