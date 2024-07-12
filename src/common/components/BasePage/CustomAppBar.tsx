import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "modules/authentication/hooks/useAuth";
import { AppBar } from "./styles";

interface CustomAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  onLogout: () => void;
}

const CustomAppBar = ({
  open,
  handleDrawerOpen,
  onLogout,
}: CustomAppBarProps) => {
  const auth = useAuth();

  const userName = auth?.getUserSession()?.name;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              PetFriends
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 2 }}
            >
              {userName}
            </Typography>
            <IconButton color="inherit" onClick={onLogout} edge="end">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CustomAppBar;
