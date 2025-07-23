"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ContactFormState {
  isOpen: boolean;
  serviceType: "brand" | "creator";
  clickPosition?: { x: number; y: number };
}

interface ContactFormContextType {
  openForm: (serviceType?: "brand" | "creator", clickPosition?: { x: number; y: number }) => void;
  closeForm: () => void;
  formState: ContactFormState;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

interface ContactFormProviderProps {
  children: ReactNode;
}

export function ContactFormProvider({ children }: ContactFormProviderProps) {
  const [formState, setFormState] = useState<ContactFormState>({
    isOpen: false,
    serviceType: "brand",
  });

  const openForm = (serviceType: "brand" | "creator" = "brand", clickPosition?: { x: number; y: number }) => {
    setFormState({
      isOpen: true,
      serviceType,
      clickPosition,
    });
  };

  const closeForm = () => {
    setFormState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <ContactFormContext.Provider value={{ openForm, closeForm, formState }}>{children}</ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
}
