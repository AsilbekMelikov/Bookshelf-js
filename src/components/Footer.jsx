import React from "react";
import {
  Box,
  Container,
  IconButton,
  ImageListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import whiteLogo from "../assets/icons/white-logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const footerIconsData = [
    {
      icon: <GitHubIcon />,
      href: "https://github.com/AsilbekMelikov",
      ariaLabel: "Github link",
    },
    {
      icon: <TelegramIcon />,
      href: "https://t.me/Asilbek_Melikov",
      ariaLabel: "Github link",
    },
    {
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/in/asilbek-melikov/",
      ariaLabel: "Github link",
    },
    {
      icon: <InstagramIcon />,
      href: "https://github.com/AsilbekMelikov",
      ariaLabel: "Github link",
    },
  ];

  const footerTextData = [
    {
      text: "Home",
      navigationPath: "/home",
    },
    {
      text: "My book shelf",
      navigationPath: "/bookshelf",
    },
    {
      text: "My account",
      navigationPath: "/account",
    },
  ];

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        width: "100%",
        overflowX: "hidden",
        position: "relative",
        zIndex: "2000",
      }}
    >
      <Container>
        <Box
          sx={{
            padding: "50px",
            paddingRight: 0,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "center", lg: "space-between" },
            alignItems: { xs: "center" },
          }}
        >
          <ImageListItem>
            <img
              src={whiteLogo}
              alt={"Book shelf logo"}
              width={"110"}
              height={"53"}
              loading="lazy"
              style={{ width: "110px", marginRight: "50px" }}
            />
          </ImageListItem>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <List
              sx={{
                display: "flex",
              }}
            >
              {footerTextData.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => navigate(item.navigationPath)}
                  sx={{ flexGrow: "0", cursor: "default" }}
                >
                  <ListItemText
                    sx={
                      pathname === item.navigationPath
                        ? {
                            color: "primary.main",
                            "& .MuiTypography-root": { cursor: "pointer" },
                            "&:hover": { color: "primary.main" },
                          }
                        : {
                            color: "#fff",

                            "& .MuiTypography-root": { cursor: "pointer" },
                            "&:hover": { color: "primary.main" },
                          }
                    }
                    primary={item.text}
                  />
                </ListItemButton>
              ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <List
              sx={{
                display: "flex",
              }}
            >
              {footerIconsData.map((item, index) => (
                <ListItemIcon key={index} sx={{ flexGrow: "0" }}>
                  <IconButton
                    href={item.href}
                    target="_blank"
                    aria-label={item.ariaLabel}
                    sx={{ color: "#fff", "&:hover": { color: "primary.main" } }}
                  >
                    {item.icon}
                  </IconButton>
                </ListItemIcon>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
