<script lang="ts">
  import Web3 from "web3";
  import { onMount } from "svelte";
  import type { Bond } from "../../lib/service";
  import { MonoContract } from "../../lib/service";
  import { getFirstAccount } from "../../lib/service/crypto";
  import Mono from "../../../../artifacts/contracts/Mono.sol/Mono.json";
  import Button, { Label } from "@smui/button";
  import Center from "../../lib/components/center.svelte";
  import Bonds from "../../lib/components/bonds.svelte";

  let bonds: Bond[] = [];

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

  const contractAddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";


  const contractService = new MonoContract(contractAddress, Mono.abi, web3);

  let currentAccount = "UNKNOW";
  let depositBalance = 0;
  let nrOfBonds = 0;

  onMount(async () => {
    currentAccount = await getFirstAccount();
  });

  async function getBalance() {
    depositBalance = await contractService.getBalance();
  }

  async function deposit() {
    const account = await getFirstAccount();
    const amount = Web3.utils.toWei("1", "ether");
    await contractService.deposit(account, amount);
  }

  async function withdraw() {
    const account = await getFirstAccount();
    const amount = Web3.utils.toWei("1", "ether");
    await contractService.withdrawal(account, amount);
  };

  async function getNrOfBondsYouOwn() {
    const account = await getFirstAccount();
    const value = await contractService.getNrOfBondsMinted(account);
    nrOfBonds = value;
  }

  async function getBoundsForUser() {
    console.log(`Bounds 1: ${bonds}`);
    const account = await getFirstAccount();
    bonds = await contractService.getBonds(account);
    console.log(`Bounds: ${bonds[0]}`);
  }


  async function mintBond() {
    const account = await getFirstAccount();
    await contractService.mintBond(account);
  }


</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="Main overview" />
</svelte:head>

<div>
  <h1 class="text">Dashboard</h1>
  <Center>
    <p>Current Account: {currentAccount}</p>
  </Center>
  <Button on:click={() => deposit()} variant="raised">
    <Label>Deposit</Label>
  </Button>
  <Button on:click={withdraw}>Withdraw</Button>
  <Button on:click={getBoundsForUser}>Get Bounds</Button>
  <Button on:click={getBalance}>Get Balance</Button>
  <Button on:click={getNrOfBondsYouOwn}>Get Number of Bonds</Button>
  <Button on:click={mintBond}>Mint Bond</Button>
  <p>Balance: {depositBalance}</p>
  <p>Number of Bonds: {nrOfBonds}</p>


  <Bonds bonds="{bonds}" />

</div>
