import { AlertProvider } from "hooks/useAlert";
import Alert from "hooks/useAlert/AlertComponent";
import { AuthProvider } from "modules/authentication/hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../src/routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <Routes />
          <Alert />
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
