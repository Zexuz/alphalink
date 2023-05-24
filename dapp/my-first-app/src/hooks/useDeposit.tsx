import { useState } from "react";
import { parseUnits } from "ethers";

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