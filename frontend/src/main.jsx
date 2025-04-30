import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import UserAuthContext from "./context/UserAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <div>
      <Toaster position="top-right" />
      <UserAuthContext>
        <App />
     
      </UserAuthContext>

    </div>
  // </StrictMode>
);
