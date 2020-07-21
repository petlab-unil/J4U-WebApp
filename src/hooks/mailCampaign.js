import { useEffect, useState } from 'react';
import moment from 'moment';
import { Form } from 'antd';
import { useMutation } from '@apollo/client';

import { useAuth } from 'hooks/auth';
import { CREATE_DATETIME_JOB } from 'gql/mutations';

const prepare = (data) => {
  const params = JSON.stringify(data.params);
  return {
    datetimeJob: { ...data, params, executionDate: moment(data.executionDate).format() },
  };
};

export default () => {
  const [form] = Form.useForm();
  const { accessToken } = useAuth();
  // Create mutation
  const [createDatetimeJob, { loading: createLoading, error: createError }] = useMutation(
    CREATE_DATETIME_JOB,
    {
      context: {
        headers: {
          accessToken,
        },
      },
      refetchQueries: ['allDatetimeJobs'],
    }
  );
  // Initial group state
  const [canSave, setCanSave] = useState(false);
  // Helpers
  const formKeys = [];
  const getFormValues = () => form.getFieldsValue(formKeys);
  const validateForm = () => form.validateFields(formKeys);
  const errorsCount = async () => {
    try {
      await validateForm();
      return 0;
    } catch (err) {
      const { errorFields } = err;
      return errorFields.length;
    }
  };
  const updateCanSave = async () => {
    const noErrors = (await errorsCount()) === 0;
    setCanSave(noErrors);
  };

  // Exosed functions
  const reset = () => {
    form.resetFields();
    updateCanSave();
  };
  const save = (values) => {
    const variables = prepare(values);
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE');
    console.log(variables);
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE');
    createDatetimeJob({
      variables,
    });
  };
  const onChange = async () => {
    updateCanSave();
  };

  // useEffect(() => {
  //   reset();
  //   validateForm();
  //   updateCanSave();
  // }, [refGroup]);

  return { form, onChange, reset, save, canSave, createLoading };
};
