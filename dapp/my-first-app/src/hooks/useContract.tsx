import { useEffect, useState } from "react";
import Mono from "../../../artifacts/contracts/Mono.sol/Mono.json";
import { BigNumberish, Contract, JsonRpcProvider } from "ethers";
import { useGetBalance } from "./useGetBalance.tsx";
import { useDeposit } from "./useDeposit.tsx";
import { useWithdrawal } from "./useWithdrawal.tsx";
import { HexString } from "./hexString.tsx";


export interface IContractBase<TOut> {
  data?: TOut;
  isLoading: boolean;
  error: Error | null;
}

export interface IContractCall<TIn, TOut> extends IContractBase<TOut> {
  call: (args?: TIn) => void;
}


export interface IContract {
  isReady: boolean;
  balance: IContractBase<HexString>;
  deposit: IContractCall<string, null>;
  withdraw: IContractCall<string, null>;
}

// interface ContractContextType {
//   isReady: boolean;
//   balance: HexString | null;
//   deposit: IContractCall<string, null> | null;
//   withdraw: IContractCall<string, null> | null;
// }
//
// const ContractContext = createContext<ContractContextType>({
//   isReady: false,
//   balance: null,
//   deposit: null,
//   withdraw: null,
// });


/// TODO This should be a context, not a hook
export const useContract = (): IContract => {
  const [signer, setSigner] = useState<any>(null);
  const abi = Mono.abi;
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const provider = new JsonRpcProvider("http://localhost:8545");

  const contract = new Contract(contractAddress, abi, signer);

  const deposit = useDeposit(contract);
  const withdrawal = useWithdrawal(contract);
  const getBalance = useGetBalance(contract);


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
        getBalance.call();
      });
      setIsListeningForDeposit(true);
    }

    if (!isListeningForWithdrawal) {
      contract.on("Withdrawal", (amount: BigNumberish, to: string, timestamp: string) => {
        console.log(`Withdrawal event: amount: ${amount} to: ${to} timestamp: ${timestamp}`);
        getBalance.call();
      });
      setIsListeningForWithdrawal(true);
    }
  }, [signer, isListeningForDeposit]);

  return {
    isReady: signer !== null,
    balance: { data: getBalance.data, isLoading: getBalance.isLoading, error: getBalance.error },
    deposit: deposit,
    withdraw: withdrawal
  };
};