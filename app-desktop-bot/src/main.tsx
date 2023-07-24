import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider
        theme={{ colorScheme: "dark" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <App />
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
);
