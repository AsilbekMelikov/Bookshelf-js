import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {
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

const Header = ({ open, handleDrawerOpen }) => {
  const SEARCH_REGEX = /^[a-zA-Z ][a-zA-Z0-9-_ ]{2,40}$/;
  const [searchInput, setSearchInput] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [validSearch, setValidSearch] = useState(false);
  const dispatch = useDispatch();

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

    // eslint-disable-next-line
  }, [isFetching]);

  useEffect(() => {
    const testingSearch = SEARCH_REGEX.test(searchInput);
    setValidSearch(testingSearch);

    // eslint-disable-next-line
  }, [searchInput]);

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
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    border: "1px solid #8B96A5",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
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

  const handleClick = () => {
    triggerSearch(searchInput);
    setSearchInput("");
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        backgroundColor: "#fff",
        paddingY: "10px",
        paddingX: "30px",
        marginBottom: "70px",
      }}
    >
      <Container>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            sx={{ color: "#fa7c54", mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <ImageListItem>
            <img
              src={logo}
              alt={"Book shelf logo"}
              width={"110"}
              height={"53"}
              loading="lazy"
              style={{ width: "130px", marginRight: "50px" }}
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
                aria-label="Search books from your book shelf"
                sx={{
                  width: "100%",
                  color: "#8b96a5",
                }}
                autoFocus
              />
              <Button
                type="button"
                disabled={!validSearch || isFetching}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#fa7c54",
                  color: "#fff",
                  paddingX: "20px",
                  width: "200px",
                  transitionDuration: "0.5s",
                  "&:hover": {
                    backgroundColor: "#fa7c54",
                    opacity: 0.8,
                  },
                }}
                onClick={handleClick}
              >
                {isFetching ? (
                  <>
                    <CircularProgress
                      style={{
                        width: "25px",
                        height: "25px",
                        marginRight: "10px",
                        color: "#fa7c54",
                      }}
                    />
                    Searching
                  </>
                ) : (
                  "Search books"
                )}
              </Button>
            </Search>
          ) : (
            ""
          )}

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
