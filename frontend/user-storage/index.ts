import { User } from 'shared/types';

const TOKEN_LOCALSTORAGE_KEY = 'DCABOT_TOKEN';
const USER_LOCALSTORAGE_KEY = 'USER_DATA';

// helper to get user from localstorage
export function getStoredToken(): string | null {
  const storedUser = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, JSON.stringify(token));
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
}

// helper to get user from localstorage
export function getStoredUser(): User | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: User): void {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}

export function clearStoreduser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
