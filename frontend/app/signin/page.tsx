'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from 'auth/useAuth';
import { useAuthContext } from 'auth/authContext';
import CheckBoxSection from './CheckBoxSection';
import React, { useState, KeyboardEvent } from 'react';
// import { Link, Navigate } from 'react-router-dom';
import {
  displayZodErrorToast,
  SignInCredentials,
  SignInCredentialsType,
} from 'validation';

const SigninPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authenticate = useAuth();
  const { user } = useAuthContext();

  // if already login, then redirect to main page
  if (user) {
    //redirect to main page
    router.push('/');
  }

  const handleLoginCredentials = () => {
    // valide using zod
    const validationIs = SignInCredentials.safeParse({ email, password });

    if (!validationIs.success) {
      // display errors in toast
      if ('error' in validationIs)
        displayZodErrorToast<SignInCredentialsType>(validationIs.error);
    } else {
      // submit credentials for authentication
      authenticate.signin(email, password);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLoginCredentials();
    }
  };

  return (
    <>
      <section className='relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28'>
        <div className='container'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]'>
                <h3 className='mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl'>
                  Sign In
                </h3>
                {/* <GoogleSSOButton /> */}
                {/* <SignInSeparator /> */}
                <div className='mb-8'>
                  <label
                    htmlFor='email'
                    className='mb-3 block text-sm font-medium text-dark dark:text-white'
                  >
                    Your Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your Email'
                    className='w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp'
                  />
                </div>
                <div className='mb-8'>
                  <label
                    htmlFor='password'
                    className='mb-3 block text-sm font-medium text-dark dark:text-white'
                  >
                    Your Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    placeholder='Enter your Password'
                    className='w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp'
                  />
                </div>
                {/* CheckBoxSection */}
                <CheckBoxSection />
                {/* End Checkbox Section  */}
                <div className='mb-6'>
                  <button
                    disabled={!email || !password}
                    onClick={handleLoginCredentials}
                    className='flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp'
                  >
                    Sign in
                  </button>
                </div>
                <p className='text-center text-base font-medium text-body-color'>
                  Don’t you have an account?
                </p>
                <p className='text-center text-base font-medium text-body-color'>
                  <Link href='/signup' className='text-primary hover:underline'>
                    Sign up for Free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
