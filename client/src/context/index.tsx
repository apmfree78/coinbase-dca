import React, {
  useContext,
  createContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';
import { ToastProps, ToastType } from 'layout/Toast';

export type ToastState = ToastProps & {
  visible: boolean;
};

interface GlobalContextProps {
  open: boolean;
  closeModal: () => void;
  openModal: () => void;
  toast: ToastState;
  showToast: (message: ReactNode, type: ToastType) => void;
  hideToast: () => void;
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

  // toast toggle state
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: <div></div>,
    type: 'success',
  });
  const showToast = (message: ReactNode, type: ToastType) => {
    setToast({ visible: true, message, type });
  };
  const hideToast = () =>
    setToast({ visible: false, message: <div></div>, type: 'success' });

  return (
    <GlobalContext.Provider
      value={{ open, closeModal, openModal, toast, showToast, hideToast }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
