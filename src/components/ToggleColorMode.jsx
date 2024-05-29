import { ThemeProvider } from "@emotion/react";
import { ColorModeContext } from "./DarkMode";
import React, { useMemo, useState } from "react";
import { createTheme } from "@mui/material";

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#fa7c54",
          },
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
