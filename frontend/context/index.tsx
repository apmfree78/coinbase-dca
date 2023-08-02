import React, {
  useContext,
  createContext,
  useState,
  ReactElement,
} from 'react';

interface GlobalContextProps {
  open: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GlobalContext: React.Context<GlobalContextProps> = createContext(
  {} as GlobalContextProps
);

export const GlobalProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  // modal toggle state
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <GlobalContext.Provider value={{ open, closeModal, openModal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
