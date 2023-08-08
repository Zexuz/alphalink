import { useState } from "react";
import { BigNumberish, parseUnits } from "ethers";

export const useDeposit = (contract: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);


  const value = parseUnits("1.0", "ether");

  const call = () => {
    setIsLoading(true);
    console.log(`depositing ${value}`);
    contract.deposit({ value: value }).then(() => {
      setIsLoading(false);
    }).catch((err: Error) => {
      setError(err);
      setIsLoading(false);
    });
  };

  return {
    call,
    data: null,
    isLoading,
    error
  };
};

export const useOnDeposit = (contract: any, address: string) => {
  contract.on("Deposit", (amount: BigNumberish, from: string, timestamp: string) => {
    console.log(`Deposit event: amount: ${amount} from: ${from} timestamp: ${timestamp}`);
  });
};