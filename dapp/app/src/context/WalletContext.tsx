import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WalletContextType {
  address: string;
  isConnected: boolean;
  setConnected: (isConnected: boolean) => void;
  setAddress: (address: string) => void;
}

const WalletContext = createContext<WalletContextType>({
  address: "",
  isConnected: false,
  setConnected: () => {
    throw new Error("setConnected function must be overridden");
  },
  setAddress: () => {
    throw new Error("setAddress function must be overridden");
  }
});


const WalletProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState("");
  const [isConnected, setConnected] = React.useState(false);


  function handleAccountsChanged(accounts: string[]) {
    setAddress(accounts[0]);
  }

  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    if (!window.ethereum.isConnected()) {
      //Navigate to connect wallet page
      navigate("/");
    }
  }, [navigate]);


  const value: WalletContextType = {
    address,
    isConnected,
    setConnected,
    setAddress
  };

  console.log(children);

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => {
  const context = React.useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export { WalletContext, WalletProvider, useWallet };

