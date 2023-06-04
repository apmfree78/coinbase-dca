import 'styles/SignUpSignIn.css';

import { useAuth } from 'auth/useAuth';
import { useUser } from 'user/hooks/useUser';
import Layout from 'layout';
import React, { useState } from 'react';
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
  const { user } = useUser();

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
          placeholder='Password'
        />

        <button
          type='submit'
          disabled={!email || !password}
          onClick={handleLoginCredentials}
          className='py-3 px-5 rounded text-md text-slate-50 font-bold uppercase bg-green-400 hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed'
        >
          Login
        </button>

        <Link
          className='mt-4 block text-blue-400 hover:text-blue-700'
          to='/signup'
        >
          No Account? Sign Up for Free!
        </Link>
      </div>
    </Layout>
  );
};

export default SignIn;
