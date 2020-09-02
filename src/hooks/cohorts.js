import { useEffect, useState } from 'react';
import moment from 'moment';
import { Form } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'hooks/auth';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
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
  const [refObj, setRefObj] = useState({});
  const [canSave, setCanSave] = useState(false);

  const hasChanged = () => {
    const newObj = form.getFieldsValue(true);
    console.log(refObj, newObj);
    return !isEqual(refObj, newObj);
  };

  const onChange = () => {
    console.log('bbbbb');
    setCanSave(hasChanged());
  };

  const reset = () => {
    form.resetFields();
    onChange();
  };

  useEffect(() => {
    const ref = form.getFieldsValue(true);
    setRefObj(ref);
  }, []);

  return { accessToken, form, onChange, reset, refObj, canSave };
}

export function useCreateCohort() {
  const { accessToken, form, onChange, canSave, reset } = mutationCommons();
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
    reset();
  };

  return { form, onChange, save, canSave, reset };
}

export function useUpdateCohort() {
  const { accessToken, form, onChange, refObj, canSave, reset } = mutationCommons();
  const [updateCohort] = useMutation(UPDATE_COHORT, {
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
        cohortId: refObj.id,
        cohortData: values,
      },
    });
    reset();
  };
  return { form, onChange, save, canSave, reset };
}
