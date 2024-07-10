import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useAlert } from "..";

const AlertMui = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  return (
    <Snackbar open={!!alert} autoHideDuration={6000} onClose={hideAlert}>
      <AlertMui
        onClose={hideAlert}
        severity={alert ? alert.type : undefined}
        sx={{ width: "100%" }}
      >
        {alert?.message}
      </AlertMui>
    </Snackbar>
  );
};

export default Alert;
