import 'styles/SignUpSignIn.css';

import { useAuth } from 'auth/useAuth';
import { useUser } from 'user/hooks/useUser';
import Layout from 'layout';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  displayZodErrorToast,
  SignUpCredentials,
  SignUpCredentialsType,
} from 'validation';
import Input from 'components/Input';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const authenticate = useAuth();
  const { user } = useUser();

  // if already login, then redirect to main page
  if (user) {
    //redirect to main page
    return <Navigate to='/' />;
  }

  const handleSignUpCredentials = () => {
    // valide using zod
    const validationIs = SignUpCredentials.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!validationIs.success) {
      // display errors in toast
      displayZodErrorToast<SignUpCredentialsType>(validationIs.error);
    } else {
      // submit credentials for authentication
      authenticate.signup(email, password, passwordConfirm);
    }
  };

  return (
    <Layout>
      <div
        role='form'
        className='shadow-lg p-8 rounded-3xl border border-slate-100'
      >
        <h2 className='text-3xl font-bold pb-4 text-center'>
          Sign Up for Free
        </h2>

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
          placeholder='Password'
        />

        <Input
          leftIcon='fas fa-lock'
          type='password'
          value={passwordConfirm}
          required
          minLength={8}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder='Confirm Password'
        />

        <button
          type='submit'
          disabled={!email || !password || !passwordConfirm}
          onClick={handleSignUpCredentials}
          className='dca-button'
        >
          Login
        </button>

        <Link
          className='mt-4 block text-blue-400 hover:text-blue-700'
          to='/login'
        >
          Have Account? Click Here to Login
        </Link>
      </div>
    </Layout>
  );
};

export default SignUp;
