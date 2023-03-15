<script>

    import {getFirstAccount, MonoContract, signBond} from './helpers';
    import Mono from "../../../../artifacts/contracts/Mono.sol/Mono.json";
    import Web3 from "web3";
    import {ethers} from "hardhat";

    const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    const abi = Mono.abi;

    let balance = "Unknown";
    let bondTreasury = "Unknown";
    let nrOfBonds = "Unknown";
    let bondId = 0;

    let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    const monoContract = new MonoContract(address, abi);

    async function loadMetamask() {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
        }

        try {
            // Request account access if needed
            await window.ethereum.enable();

            await monoContract.init();
        } catch (error) {
            throw error;
            // User denied account access...
        }


    }

    async function getBalance() {
        const balance = await monoContract.getBalance();
        updateBalance(balance);
    }

    async function getBondTreasury() {
        const value = await monoContract.getBondTreasury();
        bondTreasury = Web3.utils.fromWei(value, 'ether') + " ETH";
    }

    async function getNrOfBondsYouOwn() {
        const account = await getFirstAccount();
        const value = await monoContract.getNrOfBondsMinted(account);
        nrOfBonds = value;
    }

    function updateBalance(value) {
        balance = Web3.utils.fromWei(value, 'ether') + " ETH";
    }

    function update() {
        getBalance();
        getBondTreasury();
        getNrOfBondsYouOwn();
    }


    async function desposit() {
        const account = await getFirstAccount();
        const amount = Web3.utils.toWei("1", 'ether')
        await monoContract.deposit(account, amount);
        await getBalance();
    }

    async function withdraw() {
        const account = await getFirstAccount();
        const amount = Web3.utils.toWei("1", 'ether')
        await monoContract.withdrawal(account, amount);
        await getBalance();
    }

    async function mintBond() {
        const account = await getFirstAccount();
        await monoContract.mintBond(account);
        await update();
    }

    async function burnBond() {
        console.log(`burning bond ${bondId}`);
        const account = await getFirstAccount();
        await monoContract.burnBond(account, bondId);
        await update();
    }

    async function getBonds() {
        const account = await getFirstAccount();
        const bonds = await monoContract.getBonds(account);
        console.log(bonds);
    }

    async function liqUser(){
        const signature = '0x8c61a5712df5389c76a5155f79318867782ffa08f4eced2dfe743f6e1457e4aa2699e7768ccd237908b4999e698abdfad9de0b315bdadd8a8ac576da4c5be44a1c';

        const {r, s, v} = ethers.utils.splitSignature(signature);

    }




</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app"/>
</svelte:head>

<div class="text-column">
    <h1>Web3</h1>

    <h3>Your ballance: {balance}</h3>
    <h3>Value of bonds: {bondTreasury}</h3>
    <h3>Nr of bonds you own: {nrOfBonds}</h3>

    <p>Selected bondId: {bondId}</p>


    <button on:click={getFirstAccount}>Get first account</button>
    <button on:click={loadMetamask}>Load Metamask</button>
    <button on:click={getBalance}>Get Balance</button>
    <button on:click={desposit}>Deposit</button>
    <button on:click={withdraw}>Withdraw</button>
    <button on:click={getBondTreasury}>Get Bond Treasury</button>
    <button on:click={getNrOfBondsYouOwn}>Get Number of Bonds</button>
    <button on:click={mintBond}>Mint Bond</button>
    <input bind:value={bondId}>
    <button on:click={burnBond}>Burn Bond</button>
    <button on:click={getBonds}>Get Bonds</button>
    <button on:click={() => signBond(bondId)}>Sign Bond</button>
    <pre>npm create svelte@latest</pre>


</div>

<style>
    button {
        margin: 10px;
    }
</style>