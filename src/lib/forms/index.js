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

export const postSchema = Yup.object().shape({
  title: Yup.string().required().min(3, 'Please provide a longer title'),
  region: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  details: Yup.string().required(),
  media: Yup.array().of(Yup.mixed().required()),
  length_of_stay: Yup.object({
    num: Yup.number().positive().integer(),
    period: Yup.string().oneOf(['days', 'weeks', 'months'])
  }),
  date_travelled: Yup.object({
    month: Yup.string().oneOf([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]),
    year: Yup.number().positive()
  }),
  size_of_group: Yup.number().positive(),
  total_budget: Yup.number().positive(),
  budget: Yup.object({
    accommodation: Yup.number().positive(),
    food_drinks: Yup.number().positive(),
    activities: Yup.number().positive(),
    transportation: Yup.number().positive()
  })
});
