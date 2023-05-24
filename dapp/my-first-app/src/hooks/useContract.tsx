import { useEffect, useState } from "react";
import Mono from "../../../artifacts/contracts/Mono.sol/Mono.json";
import { BigNumberish, Contract, JsonRpcProvider } from "ethers";
import { useGetBalance } from "./useGetBalance.tsx";
import { useDeposit } from "./useDeposit.tsx";
import { useWithdrawal } from "./useWithdrawal.tsx";
import { HexString } from "./hexString.tsx";


export interface IContractCall<TIn, TOut, > {
  call: (args?: TIn) => void;
  data?: TOut;
  isLoading: boolean;
  error: Error | null;
}


export interface IContract {
  isReady: boolean;
  getBalance: IContractCall<null, HexString>;
  deposit: IContractCall<string, null>;
  withdraw: IContractCall<string, null>;
}

interface IUseContractProps {
  events?: {
    onWithdrawal: () => void | null;
    onDeposit: () => void | null;
  };
}

/// TODO This should be a context, not a hook
export const useContract = ({ events }: IUseContractProps): IContract => {
  const [signer, setSigner] = useState<any>(null);
  const abi = Mono.abi;
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const provider = new JsonRpcProvider("http://localhost:8545");

  const [isListeningForDeposit, setIsListeningForDeposit] = useState<boolean>(false);
  const [isListeningForWithdrawal, setIsListeningForWithdrawal] = useState<boolean>(false);

  useEffect(() => {
    const getSigner = async () => {
      const res = await provider.getSigner();
      setSigner(res);
    };

    getSigner();
  }, []);

  useEffect(() => {
    if (!signer) return;

    if (!isListeningForDeposit) {
      contract.on("Deposit", (amount: BigNumberish, from: string, timestamp: string) => {
        console.log(`Deposit event: amount: ${amount} from: ${from} timestamp: ${timestamp}`);
        events?.onDeposit?.();
      });
      setIsListeningForDeposit(true);
    }

    if (!isListeningForWithdrawal) {
      contract.on("Withdrawal", (amount: BigNumberish, to: string, timestamp: string) => {
        console.log(`Withdrawal event: amount: ${amount} to: ${to} timestamp: ${timestamp}`);
        events?.onWithdrawal?.();
      });
      setIsListeningForWithdrawal(true);
    }
  }, [signer, isListeningForDeposit]);


  const contract = new Contract(contractAddress, abi, signer);
  const getBalance = useGetBalance(contract);
  const deposit = useDeposit(contract);
  const withdrawal = useWithdrawal(contract);

  return {
    isReady: signer !== null,
    getBalance: getBalance,
    deposit: deposit,
    withdraw: withdrawal
  };
};