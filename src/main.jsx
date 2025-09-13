import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import ScanProvider from "./contexts/ScanProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScanProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ScanProvider>
  </StrictMode>
);
