import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  ImageListItem,
} from "@mui/material";
import logo from "../assets/icons/Logo 1.svg";
import MuiAppBar from "@mui/material/AppBar";
import { useLazySearchBooksQuery } from "../features/authApiSlice";
import { useDispatch } from "react-redux";
import { setSearchBooks, setSearchLoading } from "../features/authSlice";
import { useLocation } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import DarkMode from "./DarkMode";
import { useTheme } from "@emotion/react";
import whiteLogo from "../assets/icons/white-logo.png";

const Header = ({ open, handleDrawerOpen }) => {
  const SEARCH_REGEX = /^[0-9a-zA-Z ][a-zA-Z0-9-_ ]{2,40}$/;
  const [searchInput, setSearchInput] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [validSearch, setValidSearch] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [triggerSearch, { data: searchBooks, isFetching }] =
    useLazySearchBooksQuery();

  const pathname = useLocation().pathname;

  console.log(errMessage);

  useEffect(() => {
    triggerSearch("hello");
    dispatch(setSearchBooks(searchBooks?.data));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!searchBooks) {
      setErrMessage("No data in existence");
    }
    dispatch(setSearchBooks(searchBooks?.data));

    // eslint-disable-next-line
  }, [searchBooks]);

  useEffect(() => {
    dispatch(setSearchLoading(isFetching));

    if (!isFetching) {
      setSearchInput("");
    }
    // eslint-disable-next-line
  }, [isFetching]);

  useEffect(() => {
    const testingSearch = SEARCH_REGEX.test(searchInput);
    setValidSearch(testingSearch);

    // eslint-disable-next-line
  }, [searchInput]);

  const handleClick = () => {
    triggerSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Prevent default behavior if necessary
      e.preventDefault();
      triggerSearch(searchInput);
    }
  };

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: "100%",
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "background.default",
    marginLeft: theme.spacing(2),
    width: "100%",
    border: "1px solid #8b96a5",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "50%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        bgcolor: "background.default",
        paddingY: "10px",
        // paddingX: { xs: "10px", sm: "30px" },
        marginBottom: "70px",
        display: "flex",
      }}
    >
      <Container>
        <Toolbar
          sx={{
            justifyContent: { sm: "flex-start", md: "space-between" },
            paddingX: { xs: 0, sm: "10px" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            sx={{
              color: "primary.main",
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <ImageListItem sx={{ width: { xs: 100, sm: 110 } }}>
            <img
              src={theme.palette.mode === "dark" ? whiteLogo : logo}
              alt={"Book shelf logo"}
              width={"110"}
              height={"53"}
              loading="lazy"
              style={{
                width: { xs: "100px", sm: "110px" },
                marginRight: { xs: "20px", sm: "30px" },
              }}
            />
          </ImageListItem>
          {pathname === "/home" ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#8b96a5" }} />
              </SearchIconWrapper>
              <StyledInputBase
                name="searchBooks"
                id="searchBooks"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyPress}
                aria-label="Search books from your book shelf"
                sx={{
                  width: "100%",
                }}
                autoFocus
              />
              <Button
                type="button"
                disabled={!validSearch || isFetching}
                variant="contained"
                size="small"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  backgroundColor: "primary.main",
                  color: "#fff",
                  paddingX: "10px",
                  width: "200px",
                  transitionDuration: "0.5s",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: 0.8,
                  },
                }}
                onClick={handleClick}
              >
                {isFetching ? (
                  <>
                    <CircularProgress
                      size={"small"}
                      style={{
                        width: "22px",
                        height: "22px",
                        marginRight: "10px",
                        color: "primary.main",
                      }}
                    />
                    Searching
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </Search>
          ) : (
            ""
          )}
          <Box
            sx={{
              display: { xs: "none", md: "inline-block" },
            }}
          >
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <DarkMode marginLeft={2} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
