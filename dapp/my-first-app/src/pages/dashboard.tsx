import { useWallet } from "../context/WalletContext.tsx";
import { Button, Input } from "@mui/material";
import useGreeter from "../hooks/useGreeter.ts";
import { useState } from "react";

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
      <Button variant="contained" onClick={sendMessage}>Send Message</Button>
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />

      <RenderMessage />
    </>
  );
};

export default dashboard;