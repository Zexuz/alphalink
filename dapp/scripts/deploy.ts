import {ethers} from "hardhat";
import {Mono} from "../typechain-types";

async function checkMyBalance(mono: Mono) {
    const myBalance = await mono.getBalance();
    console.log(`My balance is ${ethers.utils.formatEther(myBalance)} ETH`);
}

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;

    const lockedAmount = ethers.utils.parseEther("0.001");

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, {value: lockedAmount});

    await lock.deployed();

    console.log(
        `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
    );

    const Mono = await ethers.getContractFactory("Mono");
    const mono = await Mono.deploy();
    await mono.deployed();

    console.log(`Mono deployed to ${mono.address}`);

    await checkMyBalance(mono);

    await mono.deposit({value: ethers.utils.parseEther("3")});

    await checkMyBalance(mono);

    await mono.mintBond();
    await mono.mintBond();

    const bondTreasuryBalance = await mono.getBondTreasury();
    console.log(`Bond treasury balance is ${ethers.utils.formatEther(bondTreasuryBalance)} ETH`);

    const nrOfBondsMinted = await mono.getNrOfBondsMinted();
    console.log(`Nr of bonds minted is ${nrOfBondsMinted}`);

    await mono.withdrawal(ethers.utils.parseEther("1"));

    await checkMyBalance(mono);

    const bondId = 1;
    const messageBytes = ethers.utils.toUtf8Bytes(String(bondId));
    const hashToSign = ethers.utils.keccak256(messageBytes);

    const signature = await ethers.provider.getSigner().signMessage(ethers.utils.arrayify(hashToSign));

// Extract the signature values from the signature string
    const {r, s, v} = ethers.utils.splitSignature(signature);

// Invoke the verifySignature function on the service
    const transactionResponse = await mono.liquidateBond(
        bondId,
        hashToSign,
        v,
        r,
        s
    );

    const transactionReceipt = await transactionResponse.wait();

    transactionReceipt.events?.forEach((event) => {
        console.log(`Event ${event.event} emitted with args ${JSON.stringify(event.args)}`);

    });
    await mono.burnBond(2);


    console.log(`Burned bond 1`);

    await checkMyBalance(mono);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// import { ethers } from "hardhat";
//
// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;
//
//   const lockedAmount = ethers.utils.parseEther("0.001");
//
//   const Lock = await ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
//
//   await lock.deployed();
//
//   console.log(
//     `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }
//
// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
