import React, { createContext, useState, ReactElement } from 'react';
interface Props {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  open: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const GlobalContext: React.Context<GlobalContextProps> = createContext(
  {} as GlobalContextProps
);

export const GlobalProvider = ({ children }): ReactElement => {
  //modal toggle state
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <GlobalContext.Provider value= {{ open, closeModal, openModal }
}>
  { children }
  < /GlobalContext.Provider>
  );
};
