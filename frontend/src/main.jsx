import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-lzh5x8zbm1osvw0v.us.auth0.com"
    clientId="Q2duu6HTyVdxVVZqE2dEiHBJtgSAmFEs"
    audience="http://localhost:3000"
    authorizationParams={{ redirect_uri: window.location.origin }}
    scope="openid profile email"
  >
    <MantineProvider>
      <App />
    </MantineProvider>
  </Auth0Provider>
);
