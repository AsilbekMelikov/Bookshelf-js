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
          }}
        >
          <ImageListItem>
            <img
              src={whiteLogo}
              alt={"Book shelf logo"}
              width={"110"}
              height={"53"}
              loading="lazy"
              style={{ width: "130px", marginRight: "50px" }}
            />
          </ImageListItem>

          <List
            sx={{
              display: "flex",
              marginLeft: "auto",
            }}
          >
            {footerTextData.map((item) => (
              <ListItemButton
                onClick={() => navigate(item.navigationPath)}
                sx={{ flexGrow: "0", cursor: "default" }}
              >
                <ListItemText
                  sx={
                    pathname === item.navigationPath
                      ? {
                          color: "#fa7c54",
                          "& .MuiTypography-root": { cursor: "pointer" },
                          "&:hover": { color: "#fa7c54" },
                        }
                      : {
                          color: "#fff",

                          "& .MuiTypography-root": { cursor: "pointer" },
                          "&:hover": { color: "#fa7c54" },
                        }
                  }
                  primary={item.text}
                />
              </ListItemButton>
            ))}
          </List>
          <List
            sx={{
              display: "flex",
              marginLeft: "auto",
            }}
          >
            {footerIconsData.map((item) => (
              <ListItemIcon sx={{ flexGrow: "0" }}>
                <IconButton
                  href={item.href}
                  target="_blank"
                  aria-label={item.ariaLabel}
                  sx={{ color: "#fff", "&:hover": { color: "#fa7c54" } }}
                >
                  {item.icon}
                </IconButton>
              </ListItemIcon>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
