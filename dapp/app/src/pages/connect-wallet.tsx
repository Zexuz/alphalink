import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useWallet } from "../context/WalletContext.tsx";
import { useNavigate } from "react-router-dom";

const ConnectWallet = () => {
  const navigate = useNavigate();
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const wallet = useWallet();
  const [bool, setBool] = useState<boolean>(false);
  const toggleBool = () => setBool(!bool);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  useEffect(() => {
    if (!wallet.isConnected) return;

    navigate("/dashboard");
  }, [wallet.isConnected, navigate]);

  const updateWalletAddress = async (address: string) => {
    wallet.setAddress(address);
    wallet.setConnected(true);
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const firstAccount = accounts[0];
    updateWalletAddress(firstAccount);
  };

  return (
    <div className="App">

      <button onClick={toggleBool}>Toggle Bool</button>
      <div>Bool: {bool ? "true" : "false"}</div>

      <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>

      {hasProvider &&                               /* Updated */
        <button onClick={handleConnect}>Connect MetaMask</button>
      }

      {wallet.isConnected &&
        <div>Wallet Accounts: {wallet.address}</div>
      }
    </div>
  );
};

export default ConnectWallet;