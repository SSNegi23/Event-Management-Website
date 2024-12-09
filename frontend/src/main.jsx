import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { EventListProvider } from "./context/EventListContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EventListProvider>
      <App />
    </EventListProvider>
  </BrowserRouter>
);
