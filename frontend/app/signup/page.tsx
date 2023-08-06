'use client';

import React, { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'auth/useAuth';
import { useAuthContext } from 'auth/authContext';
import Link from 'next/link';
import TermsCheckBox from './TermsCheckBox';
import {
  displayZodErrorToast,
  SignUpCredentials,
  SignUpCredentialsType,
} from 'validation';
import { customToast } from '@/Toast';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const authenticate = useAuth();

  const handleSignUpCredentials = () => {
    // valide using zod
    const validationIs = SignUpCredentials.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!validationIs.success) {
      // display errors in toast
      if ('error' in validationIs)
        displayZodErrorToast<SignUpCredentialsType>(validationIs.error);
    } else {
      // submit credentials for authentication
      authenticate.signup(email, password, passwordConfirm);
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
                  Create your account
                </h3>
                <p className='mb-11 text-center text-base font-medium text-body-color'>
                  It’s totally free and super easy
                </p>
                <div className='mb-8'>
                  <label
                    htmlFor='email'
                    className='mb-3 block text-sm font-medium text-dark dark:text-white'
                  >
                    {' '}
                    Email{' '}
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
                    {' '}
                    Password{' '}
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your Password'
                    className='w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp'
                  />
                </div>
                <div className='mb-8'>
                  <label
                    htmlFor='password'
                    className='mb-3 block text-sm font-medium text-dark dark:text-white'
                  >
                    {' '}
                    Confirm Password{' '}
                  </label>
                  <input
                    type='password'
                    name='confirm-password'
                    value={passwordConfirm}
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder='Confirm Password'
                    className='w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp'
                  />
                </div>
                <TermsCheckBox />
                <div className='mb-6'>
                  <button
                    type='submit'
                    disabled={!email || !password || !passwordConfirm}
                    onClick={handleSignUpCredentials}
                    className='flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp'
                  >
                    Sign up
                  </button>
                </div>
                <p className='text-center text-base font-medium text-body-color'>
                  Already using Startup?
                  <Link href='/signin' className='text-primary hover:underline'>
                    Sign in
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

export default SignupPage;
