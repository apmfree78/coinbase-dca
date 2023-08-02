// import { render, screen } from '@testing-library/react';
import SignIn from '../user/SignIn';
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

describe('sign in form appears and behaves as expected (before making call to server)', () => {
  test('Sign In Form Appears', async () => {
    render(<SignIn />);

    const element = await screen.findByRole('form');
    expect(element).toBeInTheDocument();
  });

  test('header appears', async () => {
    render(<SignIn />);
    const headerElement = await screen.findByRole('heading', {
      name: /sign in to your account/i,
    });
    expect(headerElement).toBeInTheDocument();
  });

  test('user email input appears on screen', async () => {
    render(<SignIn />);
    const emailInput = await screen.findByPlaceholderText('Email');

    fireEvent.change(emailInput, { target: { value: 'test123@gmail.com' } });
    expect(emailInput).toHaveValue('test123@gmail.com');
  });

  test('login button is disabled initially', async () => {
    render(<SignIn />);
    const loginButton = await screen.findByRole('button', {
      name: /login/i,
    });
    expect(loginButton).toBeDisabled();
  });

  test('login button is enabled once email and password field filled', async () => {
    render(<SignIn />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test123@gmail.com' } });

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'abc123' } });

    const loginButton = await screen.findByRole('button', {
      name: /login/i,
    });
    expect(loginButton).toBeEnabled();
  });
});

describe('user login succeeds and fails as expected ', () => {
  //set mock server response for both auth and user
  // user is just null in this case

  it('should show error message when login fails', async () => {
    render(<SignIn />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = await screen.findByRole('button', { name: /login/i });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);
    const errorMessage = await screen.findByText(
      'Invalid email / password combo'
    );

    expect(errorMessage).toBeVisible();
  });

  // FIX
  it.skip('should successly login', async () => {
    render(<SignIn />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);
    const heading = await screen.findByText(
      'Logged in as amit@profitswami.com'
    );
    expect(heading).toBeVisible();
  });
});
