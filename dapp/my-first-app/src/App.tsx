import React, { useEffect } from "react";
import "./App.css";

// import { GreeterClient } from "../client/proto/Greeter.client.ts";
// import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import ConnectWallet from "./pages/connect-wallet.tsx";
import { WalletProvider } from "./context/WalletContext.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard.tsx";




const Layout = () => {
  return (
    <WalletProvider>
      <p>Header</p>
      <Outlet />
      <p>Footer</p>
    </WalletProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        element: <ConnectWallet />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }

]);

function App() {

  useEffect(() => {

  });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
