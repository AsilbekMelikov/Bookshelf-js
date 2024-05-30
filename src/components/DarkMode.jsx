import { useTheme } from "@emotion/react";
import { IconButton } from "@mui/material";
import React, { createContext, useContext } from "react";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const DarkMode = ({ marginLeft, alignSelfRight }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <IconButton
      sx={{ ml: marginLeft, alignSelf: alignSelfRight }}
      onClick={(e) => {
        e.stopPropagation();
        colorMode.toggleColorMode();
      }}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default DarkMode;
