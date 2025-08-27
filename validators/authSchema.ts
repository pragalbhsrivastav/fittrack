import * as yup from 'yup';

export const signInSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const registerSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match') // ✅ Important part
        .required('Confirm Password is required'),
});

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;

export type SignInSchemaType = yup.InferType<typeof signInSchema>;
