import 'styles/SignUpSignIn.css';
import { useAuthContext } from 'auth/authContext';
import Layout from 'layout';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  PasswordResetEmail,
  PasswordResetEmailType,
  displayZodErrorToast,
} from 'validation';
import { customToast } from 'components/Toast';
import Input from 'components/Input';
import { useReset } from 'auth/reset';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const { requestPasswordReset } = useReset();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // if already login, then redirect to main page
  if (user) {
    //redirect to main page
    return <Navigate to='/' />;
  }

  const handleEmail = () => {
    // valide using zod
    const validationIs = PasswordResetEmail.safeParse(email);

    if (!validationIs.success) {
      // display errors in toast
      displayZodErrorToast<PasswordResetEmailType>(validationIs.error);
    } else {
      // submit email for reset
      requestPasswordReset(email);
      customToast('check your email for reset email', 'is-success');
      navigate('/login')
    }
  };

  return (
    <Layout>
      <div
        role='form'
        className='shadow-lg p-8 rounded-3xl border border-slate-100'
      >
        <h2 className='text-3xl font-bold pb-4 text-center'>
          Request Password Reset
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

        <button
          type='submit'
          disabled={!email}
          onClick={handleEmail}
          className='dca-button'
        >
          SUBMIT REQUEST
        </button>
      </div>
    </Layout>
  );
};

export default PasswordReset;
