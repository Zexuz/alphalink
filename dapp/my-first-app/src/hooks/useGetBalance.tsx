import { useState } from "react";

import { HexString } from "./hexString.tsx";

export const useGetBalance = (contract: any) => {
  const [data, setData] = useState<HexString>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const call = () => {
    setIsLoading(true);
    contract.getBalance().then((res: HexString) => {
      console.log(`received balance: ${res}`);
      setData(res);
      setIsLoading(false);
    }).catch((err: Error) => {
      setError(err);
      setIsLoading(false);
    });
  };

  return {
    call,
    data,
    isLoading,
    error
  };
};