import { useContract } from "../hooks/useContract.tsx";
import { DisplayBalance } from "./displayBalance.tsx";
import { Grid } from "@mui/material";
import { CustomButton } from "../components/CustomButton.tsx";

export const SmartContract = () => {
  const onBalanceChanged = () => {
    getBalance.call();
  };

  const events = {
    onDeposit: onBalanceChanged,
    onWithdrawal: onBalanceChanged
  };


  const { getBalance, deposit: useDeposit, withdraw: useWithdraw } = useContract({ events });

  const deposit = () => {
    useDeposit.call();
    console.log("deposit");
  };

  const withdraw = () => {
    console.log("withdraw");
    useWithdraw.call();
  };

  const onGetBalanceClicked = () => {
    getBalance.call();
  };


  return (
    <>
      <h2>Smart Contract</h2>
      <DisplayBalance {...getBalance} />
      <Grid container spacing={2}>
        <Grid item md={12}>
          <CustomButton onClick={onGetBalanceClicked}>Get Balance</CustomButton>
        </Grid>
        <Grid item xs={6} md={6}>
          <CustomButton onClick={deposit}>Deposit</CustomButton>
        </Grid>
        <Grid item xs={6} md={6}>
          <CustomButton onClick={withdraw}>Withdraw</CustomButton>
        </Grid>

      </Grid>
    </>
  );
};