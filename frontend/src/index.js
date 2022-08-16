import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./context/AuthProvider";

import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);

const theme = createTheme({
  palette: { mode: "dark" },
});

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
