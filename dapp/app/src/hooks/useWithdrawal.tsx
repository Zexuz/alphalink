import { useState } from "react";
import { parseUnits } from "ethers";

export const useWithdrawal = (contract: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);


  const value = parseUnits("1.0", "ether");
  console.log(`value: ${value.toString()}`);

  const call = async () => {
    try {
      setIsLoading(true);
      console.log(`withdrawal ${value}`);
      const tx = await contract.withdrawal(value);
      await tx.wait();
    } catch (err: any) {
      console.log(`withdrawal error: ${err}`);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    call,
    data: null,
    isLoading,
    error
  };
};