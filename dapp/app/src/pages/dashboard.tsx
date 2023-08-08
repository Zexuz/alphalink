import { useWallet } from "../context/WalletContext.tsx";
import { Input } from "@mui/material";
import useGreeter from "../hooks/useGreeter.ts";
import { useState } from "react";
import { CustomButton } from "../components/CustomButton";
import { SmartContract } from "./smartContract.tsx";


const dashboard = () => {
  const wallet = useWallet();
  const greeter = useGreeter();
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    greeter.call({ name: message });
  };

  const RenderMessage = () => {
    if (greeter.isLoading) return <p>Loading...</p>;

    if (greeter.error) return <p>Error: {greeter.error.message}</p>;

    if (!greeter.data) return <p>No data</p>;

    return <p>{greeter.data?.message}</p>;
  };


  return (
    <>
      <h1>Dashboard</h1>
      <h2>Current Account: {wallet.address}</h2>
      <CustomButton onClick={sendMessage}>Send Message</CustomButton>
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />

      <RenderMessage />
      <SmartContract />
    </>
  );
};


export default dashboard;