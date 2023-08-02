import 'styles/SignUpSignIn.css';

import { useAuth } from 'auth/useAuth';
import { useAuthContext } from 'auth/authContext';
import Layout from 'layout';
import React, { useState, KeyboardEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  displayZodErrorToast,
  SignInCredentials,
  SignInCredentialsType,
} from 'validation';
import Input from 'components/Input';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authenticate = useAuth();
  const { user } = useAuthContext();

  // if already login, then redirect to main page
  if (user) {
    //redirect to main page
    return <Navigate to='/' />;
  }

  const handleLoginCredentials = () => {
    // valide using zod
    const validationIs = SignInCredentials.safeParse({ email, password });

    if (!validationIs.success) {
      // display errors in toast
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
    <Layout>
      <div
        role='form'
        className='shadow-lg p-7 rounded-3xl border border-slate-100'
      >
        <h2 className='text-3xl font-bold pb-4'>Sign In to Your Account</h2>

        <Input
          leftIcon='fas fa-envelope'
          rightIcon='fas fa-check'
          type='email'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />

        <Input
          leftIcon='fas fa-lock'
          type='password'
          value={password}
          required
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder='Password'
        />

        <button
          type='submit'
          disabled={!email || !password}
          onClick={handleLoginCredentials}
          className='dca-button'
        >
          Login
        </button>

        <div className='flex flex-col mt-3'>
          <Link className='text-blue-400 hover:text-blue-700' to='/signup'>
            No Account? Sign Up for Free!
          </Link>
          <Link
            className='text-blue-400 text-sm hover:text-blue-700'
            to='/password-reset'
          >
            Click Here to Reset Password
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
