import Web3 from "web3";
import Mono from "../../../../artifacts/contracts/Mono.sol/Mono.json";
import {ethers} from "hardhat";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export async function signBond(bondId: number) {
    const messageBytes = web3.utils.utf8ToHex(String(bondId));
    const hashToSign = web3.utils.keccak256(messageBytes);

    const account = await getFirstAccount();
    const signature = await web3.eth.sign(Web3.utils.toHex(hashToSign), account);
    console.log(`signature: ${signature}`)
}

export async function getFirstAccount() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    console.log(account);
    return account;
}

export class MonoContract {

    private contract: any;

    constructor(
        private readonly address: string,
        private readonly abi: any
    ) {
    }

    async init() {
        console.log(`INit contract`)
        this.contract = new web3.eth.Contract(this.abi, this.address);
    }

    async getBalance() {
        return await this.contract.methods.getBalance().call();
    }

    async deposit(address: string, amount: string) {
        await this.contract.methods.deposit().send({
            from: address,
            value: amount
        });
    }

    async withdrawal(address: string, amount: string) {
        await this.contract.methods.withdrawal(amount).send({
            from: address
        });
    }

    async mintBond(address: string) {
        await this.contract.methods.mintBond().send({
            from: address
        });
    }

    async burnBond(address: string, bondId: number) {
        await this.contract.methods.burnBond(bondId).send({
            from: address
        });
    }

    async getNrOfBondsMinted(address: string) {
        return await this.contract.methods.getNrOfBondsMinted().call({
            from: address
        });
    }

    async getBondTreasury() {
        return await this.contract.methods.getBondTreasury().call();
    }

    async getBonds(address: string) {
        return await this.contract.methods.getBonds().call({
            from: address
        });
    }

    async liqUser(address: string, bondId: number, signature: string) {
        const {r, s, v} = web3.eth.accounts.recover(signature);

    }

    async liquidateBond(address: string, bondId: number, hashToSign: string, v: number, r: string, s: string) {
        await this.contract.methods.liquidateBond(bondId, hashToSign, v, r, s).send({
            from: address
        });
    }
}
