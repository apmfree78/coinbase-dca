import { ReactNode } from 'react';
import classNames from 'classnames';

export type ToastType = 'warning' | 'success' | 'info' | 'error';
export type ToastProps = {
  message: ReactNode;
  type: ToastType;
};

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const toastAlertClass = classNames('alert', `alert-${type}`);
  return (
    <div className='toast toast-center'>
      <div className={toastAlertClass}>{message}</div>
    </div>
  );
};

export default Toast;
