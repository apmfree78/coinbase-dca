import "styles/App.css";

import React, { ReactElement } from "react";

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return <div className="App center">{children}</div>;
};

export default Layout;
