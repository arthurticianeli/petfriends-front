import CategoryIcon from "@mui/icons-material/Category";
import PetsIcon from "@mui/icons-material/Pets";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuth } from "modules/authentication/hooks/useAuth/";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticatedPage } from "../AuthenticatedPage.tsx";
import CustomAppBar from "./CustomAppBar";
import CustomDrawer from "./CustomDrawer";
import { DrawerHeader, Main } from "./styles";

export interface IMenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const menuList: IMenuItem[] = [
  { title: "Pets", icon: <PetsIcon />, path: "/pets" },
  { title: "Categories", icon: <CategoryIcon />, path: "/categories" },
];

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    auth.clearSession();
  };

  return (
    <AuthenticatedPage>
      <CssBaseline />
      <CustomAppBar
        open={open}
        onLogout={onLogout}
        handleDrawerOpen={handleDrawerOpen}
      />
      <CustomDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        menuList={menuList}
        navigate={navigate}
      />
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </AuthenticatedPage>
  );
};

export default Page;
