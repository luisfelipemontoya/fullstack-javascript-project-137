import * as yup from 'yup';

const validateUrl = (url, feeds = []) => {
  const schema = yup
    .string()
    .required('No puede estar vacío')
    .url('Debes ingresar una URL válida')
    .test('unique', 'RSS ya existe', (value) => !feeds.includes(value));
 
  return schema.validate(url);
};

export default validateUrl;
