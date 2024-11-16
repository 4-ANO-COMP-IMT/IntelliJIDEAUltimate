import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from 'react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "contexts/AuthContext";

// Crie uma instância de QueryClient
const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
);
