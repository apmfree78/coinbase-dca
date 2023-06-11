import 'styles/App.css';
import React, { ReactElement } from 'react';

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return <div className='flex flex-col items-start mt-32'>{children}</div>;
};

export default Layout;
