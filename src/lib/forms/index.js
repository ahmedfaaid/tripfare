import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required(),
  password: Yup.string()
    .required('Please enter your password')
    .min(4, 'Password is too short')
});

const addressSchema = Yup.object().shape({
  line_1: Yup.string().required(),
  line_2: Yup.string().notRequired(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required()
});

export const registerSchema = Yup.object().shape({
  first_name: Yup.string().min(2).required(),
  last_name: Yup.string().min(2).required(),
  email: Yup.string().email('Please enter a valid email').required(),
  username: Yup.string().min(6).max(16).required(),
  password: Yup.string()
    .required('Please enter your password')
    .min(4, 'Password is too short'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match'
  ),
  date_of_birth: Yup.date().required(),
  occupation: Yup.string().required(),
  gender: Yup.string().oneOf(['male', 'female']),
  address: addressSchema
  // profile_picture: Yup.mixed()
  //   .nullable()
  //   .notRequired()
  //   .test(
  //     'fileSize',
  //     'File exceeds the maximum supported size of 14 MB',
  //     (value) => value && value.size >= 1024 * 1024 * 14
  //   )
  //   .test(
  //     'format',
  //     'Supported file types: ".jpeg", ".jpg" and ".png"',
  //     (value) => value && supported_formats.includes(value.type)
  //   )
});
