import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router";
import QueryProviderComponent from "./providers/QueryProviderComponent";

createRoot(document.getElementById("root")!).render(
  <QueryProviderComponent>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProviderComponent>
);
