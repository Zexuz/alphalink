import React from "react";
import {Provider} from "react-redux";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import "./App.css";
import {WalletProvider} from "./context/WalletContext.tsx";

// import { GreeterClient } from "../client/proto/Greeter.client.ts";
// import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import ConnectWallet from "./pages/connect-wallet.tsx";
import Dashboard from "./pages/dashboard.tsx";
import store from "./store/store.ts";


const Layout = () => {
  return (
    <WalletProvider>
      <p>Header</p>
      <Outlet/>
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
        element: <ConnectWallet/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      }
    ]
  }

]);

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
