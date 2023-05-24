import { useContract } from "../hooks/useContract.tsx";
import { DisplayBalance } from "./displayBalance.tsx";
import { Grid } from "@mui/material";
import { CustomButton } from "../components/CustomButton.tsx";

export const SmartContract = () => {

  const { balance, deposit: useDeposit, withdraw: useWithdraw } = useContract();

  const deposit = () => {
    useDeposit.call();
    console.log("deposit");
  };

  const withdraw = () => {
    console.log("withdraw");
    useWithdraw.call();
  };


  return (
    <>
      <h2>Smart Contract</h2>
      <DisplayBalance {...balance} />
      <Grid container spacing={2}>
        {/*<Grid item md={12}>*/}
        {/*  <CustomButton onClick={onGetBalanceClicked}>Get Balance</CustomButton>*/}
        {/*</Grid>*/}
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