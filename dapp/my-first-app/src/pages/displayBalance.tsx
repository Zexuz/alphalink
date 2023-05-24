import { IContractBase } from "../hooks/useContract.tsx";
import { formatEther } from "ethers";

export const DisplayBalance = ({ error, isLoading, data }: IContractBase<string>) => {

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data) return <p>No data</p>;

  return (
    <p>Balance: {data ? `${formatEther(data)} ETH` : "unknown"}</p>
  );
};