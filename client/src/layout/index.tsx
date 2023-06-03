import 'styles/App.css';

import React, { ReactElement } from 'react';
import { useGlobalContext } from 'context';
import Toast from './Toast';

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { toast } = useGlobalContext();
  return (
    <>
      {toast.visible && <Toast message={toast.message} type={toast.type} />}
      <div className='App center'>{children}</div>
    </>
  );
};

export default Layout;
