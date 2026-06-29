import * as yup from 'yup';

const validateUrl = (url, feeds = []) => {
  const schema = yup
    .string()
    .required('required')
    .url('invalidUrl')
    .test('unique', 'duplicate', (value) => !feeds.includes(value));
 
  return schema.validate(url);
};

export default validateUrl;
