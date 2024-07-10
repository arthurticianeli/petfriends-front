import { AlertProvider } from "hooks/useAlert";
import Alert from "hooks/useAlert/AlertComponent";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../src/routes";

const App = () => {
  return (
    <BrowserRouter>
      <AlertProvider>
        <Routes />
        <Alert />
      </AlertProvider>
    </BrowserRouter>
  );
};

export default App;
