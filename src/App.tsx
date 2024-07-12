import { CssBaseline, ThemeProvider } from "@mui/material";
import { AlertProvider } from "hooks/useAlert";
import Alert from "hooks/useAlert/AlertComponent";
import { AuthProvider } from "modules/authentication/hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import theme from "theme";
import { Routes } from "../src/routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AuthProvider>
          <AlertProvider>
            <Routes />
            <Alert />
          </AlertProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
