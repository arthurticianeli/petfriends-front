// AlertContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

interface AlertContextType {
  showAlert: (message: string, type?: "success" | "error") => void;
  hideAlert: () => void;
  alert: { message: string; type: "success" | "error" } | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showAlert = React.useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setAlert({ message, type });
    },
    [setAlert]
  );

  const hideAlert = React.useCallback(() => {
    setAlert(null);
  }, [setAlert]);

  const contextValue = React.useMemo(
    () => ({ showAlert, hideAlert, alert }),
    [showAlert, hideAlert, alert]
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};
