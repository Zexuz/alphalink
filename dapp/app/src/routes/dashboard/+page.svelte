<script lang="ts">
    import Web3 from "web3";
    import {onMount} from "svelte";
    import {MonoContract} from "../../lib/service";
    import Mono from "../../../../artifacts/contracts/Mono.sol/Mono.json"
    import Button, {Label} from "@smui/button";

    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

    async function getFirstAccount() {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        console.log(account);
        return account;
    }

    const contractService = new MonoContract(contractAddress, Mono.abi, web3);

    let currentAccount = "UNKNOW";
    let depositBalance = 0;
    let nrOfBonds = 0;

    onMount(async () => {
        currentAccount = await getFirstAccount();
    });

    async function deposit() {
        const account = await getFirstAccount();
        const amount = Web3.utils.toWei("1", 'ether')
        await contractService.deposit(account, amount);
    }

    async function withdraw() {
        const account = await getFirstAccount();
        const amount = Web3.utils.toWei("1", 'ether')
        await contractService.withdrawal(account, amount);
    };

    async function getNrOfBondsYouOwn() {
        const account = await getFirstAccount();
        const value = await contractService.getNrOfBondsMinted(account);
        nrOfBonds = value;
    }

    async function mintBond() {
        const account = await getFirstAccount();
        await contractService.mintBond(account);
    }

</script>

<svelte:head>
    <title>Dashboard</title>
    <meta name="description" content="Main overview"/>
</svelte:head>

<div class="text-column">
    <h1>Dashboard</h1>
    <p>Current Account: {currentAccount}</p>
    <Button on:click={() => deposit()} variant="raised">
        <Label>Depisit</Label>
    </Button>
    <Button on:click={deposit}>Deposit</Button>
    <Button on:click={withdraw}>Withdraw</Button>
    <Button on:click={getNrOfBondsYouOwn}>Get Number of Bonds</Button>
    <Button on:click={mintBond}>Mint Bond</Button>
    <p>Balance: {depositBalance}</p>
    <p>Number of Bonds: {nrOfBonds}</p>
</div>
