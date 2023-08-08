import {formatEther} from "ethers";
import {useAppSelector} from "../hooks/storeHooks.ts";

export const DisplayBalance = () => {
  const {value, hasFetchedInitialBalance} = useAppSelector((state) => state.balance);

  if (hasFetchedInitialBalance) return <p>Loading...</p>;

  console.log(`value: ${value}`);

  if (!value) return (<p>Balance: 0 ETH</p>);

  const balanceStr = `${formatEther(value)} ETH`;

  return (
    <p>Balance: {balanceStr}</p>
  );
};