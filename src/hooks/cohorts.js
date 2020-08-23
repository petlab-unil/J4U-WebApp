import { useEffect, useState } from 'react';
import moment from 'moment';
import { Form } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'hooks/auth';
import get from 'lodash/get';
import { ALL_COHORTS } from 'gql/queries';
import { CREATE_COHORT, UPDATE_COHORT } from 'gql/mutations';

export function useAllCohorts() {
  const { accessToken } = useAuth();
  const { data, error, loading } = useQuery(ALL_COHORTS, {
    skip: !accessToken,
    context: {
      headers: {
        accessToken,
      },
    },
  });

  return { allCohorts: get(data, 'allCohorts', []), error, loading };
}

function mutationCommons() {
  const { accessToken } = useAuth();
  const [form] = Form.useForm();

  return { accessToken, form };
}

export function useCreateCohort() {
  const { accessToken, form } = mutationCommons();
  const [createCohort] = useMutation(CREATE_COHORT, {
    context: {
      headers: {
        accessToken,
      },
    },
    refetchQueries: ['allCohorts'],
  });

  const save = (values) => {
    console.log(values);
    values.cohortStart = values.cohortStart.format('YYYY-MM-DD');
    values.cohortEnd = values.cohortEnd.format('YYYY-MM-DD');
    createCohort({
      variables: {
        cohortData: values,
      },
    });
  };

  return { form, save };
}

export function useUpdateCohort(groupId) {
  const { accessToken, form } = mutationCommons();
  const [updateCohort] = useMutation(UPDATE_COHORT, {
    context: {
      headers: {
        accessToken,
      },
    },
    refetchQueries: ['allCohorts'],
  });
  return { form };
}
