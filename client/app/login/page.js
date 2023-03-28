"use client";

import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Oval } from 'react-loader-spinner';
import Head from "next/head";
import { reset } from "../redux/features/auth/authSlice";
import { login } from "../redux/features/auth/authService";

export default function Login () {
	const dispatch = useDispatch();
	const Navigate = useRouter();

	const { isLogged, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const initialValues = {
    email: '',
    password: '',
  };

	const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required('This field is required!'),
  });

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || isLogged) {
			Navigate.push("/");
		}

		dispatch(reset());
	}, [isError, isSuccess, message, isLogged, Navigate, dispatch]);

	const submitHandler = (formValue) => {
		const {
			email,
			password,
		} = formValue;

		dispatch(login({ email, password }));
	};

	return (
		<>
			<Head>
        <title>Login | Tienda Next</title>
      </Head>
			{
        isLogged ? Navigate.push("/") :
        <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <svg className='mx-auto w-12 h-12 text-gray-400' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd'></path>
            </svg>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Autentícate</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                <Form>
                  <div>
                    <div className='mt-5'>
                      <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
                      </label>
                      <div className='mt-1'>
                        <Field
                          name='email'
                          type='email'
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          placeholder='Ingrese su Correo Electrónico'
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'
                        />
                      </div>
                    </div>

                    <div className='mt-5'>
                      <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Contraseña
                      </label>
                      <div className='mt-1'>
                        <Field
                          name='password'
                          type='password'
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          placeholder='Ingrese su Contraseña'
                        />
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'
                        />
                      </div>
                    </div>
                    <div className='mt-5'>
                      {(isLoading === true) ?
                        <button
                        type='button'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          <Oval
                            color='#fff'
                            width={20}
                            height={20}
                          />
                        </button> :
                        <button
                          type='submit'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          Log In
                        </button>
                      }
                    </div>
                    <div className="text-sm mt-4">
                      <Link href="/reset_password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      }
		</>
	);
};
