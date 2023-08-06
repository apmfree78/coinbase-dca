'use client';
import { User } from 'shared/types';

const TOKEN_LOCALSTORAGE_KEY = 'DCABOT_TOKEN';
const USER_LOCALSTORAGE_KEY = 'USER_DATA';

// helper to get user from localstorage
export function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
}

export function setStoredToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, JSON.stringify(token));
  }
}

export function clearStoredToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
  }
}

// helper to get user from localstorage
export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
  }
}

export function clearStoreduser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }
}
