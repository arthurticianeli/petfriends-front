import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export const neumorphism = {
  backgroundColor: "#f0f0f3",
  borderRadius: "10px",
  boxShadow: "inset 5px 5px 10px #e0e0e3, inset -5px -5px 10px #ffffff",
  "&:hover": {
    boxShadow: "5px 5px 10px #e0e0e3, -5px -5px 10px #ffffff",
  },
  "&.Mui-focused": {
    boxShadow: "inset 5px 5px 10px #e0e0e3, inset -5px -5px 10px #ffffff",
  },
};

theme.components = {
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": neumorphism,
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": neumorphism,
      },
      listbox: {
        backgroundColor: theme.palette.background.default,
      },
      paper: {
        backgroundColor: neumorphism.backgroundColor,
        borderRadius: neumorphism.borderRadius,
        boxShadow: "5px 5px 10px 5px #e0e0e3",
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.background.default,
        borderRadius: neumorphism.borderRadius,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: neumorphism.backgroundColor,
      },
    },
  },
};

export default theme;
