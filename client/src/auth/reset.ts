import { axiosInstance } from 'axiosInstance';
import { customToast } from 'components/Toast';

export function useReset() {
  async function requestPasswordReset(email: string) {
    try {
      const response = await axiosInstance.post(
        'collections/users/request-password-reset',
        { email }
      );
      console.log(response);
    } catch (err) {
      customToast('Invalid email', 'is-warning');
    }
  }

  async function confirmPasswordReset(email: string) {
    try {
      const response = await axiosInstance.post(
        'collections/users/request-password-reset',
        { email }
      );
      console.log(response);
    } catch (err) {
      customToast('confirmation failed', 'is-warning');
    }
  }

  return { requestPasswordReset, confirmPasswordReset };
}
