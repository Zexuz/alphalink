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

    await mono.deposit({value: ethers.utils.parseEther("1")});

    await checkMyBalance(mono);

    await mono.withdrawal(ethers.utils.parseEther("1"));

    await checkMyBalance(mono);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
