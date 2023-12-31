import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextTeam from "./hook/ContextTeam";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SelectedButtonContextProvider } from "./hook/SelectedButtonContext";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("ishga Indexjs");

root.render(
  <QueryClientProvider client={queryClient}>
    <ContextTeam>
      <BrowserRouter>
        <SelectedButtonContextProvider>
          <App />
        </SelectedButtonContextProvider>
      </BrowserRouter>
    </ContextTeam>
  </QueryClientProvider>
);
