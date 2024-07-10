import { Box } from "@mui/material";
import { useAuth } from "modules/authentication/hooks/useAuth";
import LoginPage from "modules/authentication/pages/Login";

interface AuthenticatedPageProps {
  children: React.ReactNode;
}

export const AuthenticatedPage = ({ children }: AuthenticatedPageProps) => {
  const auth = useAuth();

  if (!auth.isSessionValid()) {
    return <LoginPage />;
  }

  return <Box sx={{ display: "flex" }}>{children}</Box>;
};
