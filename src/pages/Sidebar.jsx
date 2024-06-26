import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkMode, { ColorModeContext } from "../components/DarkMode";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const pathname = useLocation().pathname;

  const sidebarInfo = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "My book shelf",
      path: "/bookshelf",
    },
    {
      title: "My Account",
      path: "/account",
    },
  ];
  const colorMode = useContext(ColorModeContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />

      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            top: "109px",
            width: { xs: 60, md: 190, xl: drawerWidth },
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon color="primary" />
            ) : (
              <ChevronRightIcon color="primary" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarInfo.map((text, index) => (
            <Link
              to={text.path}
              key={text.title}
              style={{
                listStyle: "none",
                textDecoration: "none",
                color: "#757575",
              }}
            >
              <ListItemButton
                sx={{
                  marginBottom: { xs: "20px", md: 0 },
                }}
              >
                <ListItemIcon>
                  {index === 0 && (
                    <HomeIcon
                      sx={
                        pathname === text.path
                          ? { color: "primary.main" }
                          : { color: "" }
                      }
                    />
                  )}
                  {index === 1 && (
                    <LibraryBooksIcon
                      sx={
                        pathname === text.path
                          ? { color: "primary.main" }
                          : { color: "" }
                      }
                    />
                  )}
                  {index === 2 && (
                    <AccountCircleIcon
                      sx={
                        pathname === text.path
                          ? { color: "primary.main" }
                          : { color: "" }
                      }
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text.title}
                  sx={
                    pathname === text.path
                      ? {
                          display: { xs: "none", md: "inline-block" },
                          color: "primary.main",
                        }
                      : {
                          display: { xs: "none", md: "inline-block" },
                          color: "",
                        }
                  }
                />
              </ListItemButton>
            </Link>
          ))}
          <ListItemButton
            sx={{ marginLeft: "0", paddingLeft: "8px", paddingTop: "3px" }}
            onClick={colorMode.toggleColorMode}
          >
            <ListItemIcon sx={{ minWidth: "65px" }}>
              <DarkMode />
            </ListItemIcon>
            <ListItemText
              primary={
                theme.palette.mode === "dark" ? "Dark mode" : "Light mode"
              }
              sx={{ color: "#757575" }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
