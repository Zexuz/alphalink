// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Mono {

    event Withdrawal(uint amount, address recipient, uint timestamp);
    event Deposit(uint amount, address sender, uint timestamp);

    mapping(address => uint) public balances;

    constructor() payable {
    }


    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.value, msg.sender, block.timestamp);
    }

    function withdrawal(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(amount, msg.sender, block.timestamp);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    function getBalanceOf(address account) public view returns (uint) {
        return balances[account];
    }


    //    function withdraw() public {
    //        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
    //        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
    //
    //        require(block.timestamp >= unlockTime, "You can't withdraw yet");
    //        require(msg.sender == owner, "You aren't the owner");
    //
    //        emit Withdrawal(address(this).balance, block.timestamp);
    //
    //        owner.transfer(address(this).balance);
    //    }
}
