import React, { ReactElement } from 'react';

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return <div className='flex flex-col items-center mt-32'>{children}</div>;
};

export default Layout;
