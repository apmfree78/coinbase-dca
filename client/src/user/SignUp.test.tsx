// import { render, screen } from '@testing-library/react';
import SignUp from '../user/SignUp';
import React from 'react';
import { fireEvent, render, screen } from '../testUtils/test-utils';

jest.mock('../../user-storage/', () => ({
  getStoredUser: () => {
    return null;
  },
  setStoredUser: () => { },
}));

jest.mock('./hooks/useUser.ts', () => ({
  useUser: () => {
    return { user: null, clearUser: () => { }, updateUser: () => { } };
  },
}));

test('Sign In Form Appears', async () => {
  render(<SignUp />);
  const element = await screen.findByRole('form');
  expect(element).toBeInTheDocument();
});

test('header appears', async () => {
  render(<SignUp />);
  const headerElement = await screen.findByRole('heading', {
    name: /sign up for free/i,
  });
  expect(headerElement).toBeInTheDocument();
});

test('user email input appears on screen', async () => {
  render(<SignUp />);
  const emailInput = await screen.findByPlaceholderText('Email');
  fireEvent.change(emailInput, { target: { value: 'test123@gmail.com' } });
  expect(emailInput).toHaveValue('test123@gmail.com');
});

test('login button is disabled initially', async () => {
  render(<SignUp />);
  const loginButton = await screen.findByRole('button', {
    name: /login/i,
  });
  expect(loginButton).toBeDisabled();
});

test('login button is enabled once email, password, and confirm password field filled', async () => {
  render(<SignUp />);
  const emailInput = screen.getByPlaceholderText('Email');
  fireEvent.change(emailInput, { target: { value: 'test123@gmail.com' } });

  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'abc123' } });

  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
  fireEvent.change(confirmPasswordInput, { target: { value: 'abc123' } });

  const loginButton = await screen.findByRole('button', {
    name: /login/i,
  });
  expect(loginButton).toBeEnabled();
});
