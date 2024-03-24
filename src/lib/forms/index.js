import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required(),
  password: Yup.string()
    .required('Please enter your password')
    .min(4, 'Password is too short')
});
