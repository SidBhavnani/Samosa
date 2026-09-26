"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const EmailModalContext = createContext(null);

export function EmailModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [tabClosed, setTabClosed] = useState(false);

  const openEmailModal = useCallback(() => {
    setIsOpen(true);
    setOpened(true);
  }, []);
  const closeEmailModal = useCallback(() => setIsOpen(false), []);
  const closeTab = useCallback(() => setTabClosed(true), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (opened) return;
      setIsOpen(true);
      setOpened(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [opened]);

  return (
    <EmailModalContext.Provider
      value={{
        isOpen,
        openEmailModal,
        closeEmailModal,
        tabClosed,
        closeTab,
      }}
    >
      {children}
    </EmailModalContext.Provider>
  );
}

export const useEmailModal = () => useContext(EmailModalContext);
