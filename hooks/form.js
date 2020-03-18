import { useEffect } from "react";
import { Form } from "antd";

async function val(form, schema) {
  const values = {};
  Object.keys(schema.fields).forEach(k => {
    values[k] = form.getFieldValue(k);
  });

  const errorsSchema = {};
  Object.keys(schema.fields).forEach(k => {
    errorsSchema[k] = { name: k, value: form.getFieldValue(k), errors: [] };
  });

  await schema
    .validate(values, { abortEarly: false })
    .then(_ => [])
    .catch(function(err) {
      err.inner.forEach(item => {
        errorsSchema[item.path].errors.push(item.errors);
      });
      return errorsSchema;
    });
  form.setFields(Object.values(errorsSchema));
}

function valid(form, schema) {
  const names = Object.keys(schema.fields);
  const errors = form.getFieldsError(names);
  const count = errors
    .map(x => x.errors.length)
    .reduce((acc, val) => val + acc, 0);
  return count === 0;
}

export function useForm(schema) {
  const [form] = Form.useForm();
  const validate = () => val(form, schema);
  const isValid = () => valid(form, schema);

  useEffect(() => {
    validate();
  }, []);

  return { form, validate, isValid };
}
