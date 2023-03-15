// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log

import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";


contract Mono {

    constructor() payable {
    }


    //============== Withdrawal and Deposit ==============
    event Withdrawal(uint amount, address recipient, uint timestamp);
    event Deposit(uint amount, address sender, uint timestamp);

    mapping(address => uint) public balances;

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
    //============== Withdrawal and Deposit ==============

    //============== Mint/Burn bond ==============
    // TODO: At the moment, the all bonds represent the same value

    uint public bondTreasury = 0;
    uint public bondPrice = 1 ether;

    struct Bond {
        uint amount;
        uint id;
        address owner;
    }

    event MintBond(Bond bond, uint timestamp);
    event BurnBond(Bond bond, uint timestamp);

    mapping(address => uint) public nrOfBondsMinted;
    mapping(address => Bond[]) public bonds;

    function mintBond() public {
        require(balances[msg.sender] >= bondPrice, "Insufficient balance");
        balances[msg.sender] -= bondPrice;
        bondTreasury += bondPrice;
        uint newBondId = nrOfBondsMinted[msg.sender] + 1;
        nrOfBondsMinted[msg.sender] = newBondId;

        Bond memory bond = Bond(bondPrice, newBondId, msg.sender);
        bonds[msg.sender].push(bond);
        emit MintBond(bond, block.timestamp);
    }

    function burnBond(uint bondId) public {
        Bond[] storage bondList = bonds[msg.sender];

        for (uint i = 0; i < bondList.length; i++) {
            if (bondList[i].id != bondId) {
                continue;
            }

            bondTreasury -= bondList[i].amount;
            balances[msg.sender] += bondList[i].amount;
            Bond memory bondToDelete = bondList[i];
            bondList[i] = bondList[bondList.length - 1];
            bondList.pop();
            emit BurnBond(bondToDelete, block.timestamp);
            return;
        }

        revert("Bond does not exist");
    }

    function getNrOfBondsMinted() public view returns (uint) {
        return nrOfBondsMinted[msg.sender];
    }

    function getBondTreasury() public view returns (uint) {
        return bondTreasury;
    }

    //============== Mint/Burn bond ==============

    //============== Liquidate bond ==============
    uint liquidations = 0;

    struct SignedMessage {
        bytes32 hashedMessage;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    event LiquidateBond(Bond bond, uint timestamp);

    // TODO: Only yhe contract owner can liquidate bonds
    function liquidateBond(uint bondId,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s) public {
        Bond[] storage bondList = bonds[msg.sender];
        //TODO: Should be a parameter

        for (uint i = 0; i < bondList.length; i++) {
            if (bondList[i].id != bondId) {
                continue;
            }
            Bond memory bondToDelete = bondList[i];
            verifySignature(bondToDelete.owner, messageHash, v, r, s);
            verifyHash(messageHash, bondId);

            bondTreasury -= bondList[i].amount;
            balances[msg.sender] += bondList[i].amount;
            bondList[i] = bondList[bondList.length - 1];
            bondList.pop();
            emit LiquidateBond(bondToDelete, block.timestamp);
            return;
        }

        //        revert("Bond does not exist");
    }

    //    mapping(address => bool) public authorizedVerifiers;
    //
    //    constructor() {
    //        authorizedVerifiers[msg.sender] = true;
    //    }
    //
    //    function addAuthorizedVerifier(address verifier) public {
    //        require(authorizedVerifiers[msg.sender], "Only authorized verifiers can add new authorized verifiers");
    //        authorizedVerifiers[verifier] = true;
    //    }

    function verifySignature(
        address expectedSigner,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        bytes32 hashedSignature = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));

        address signer = ecrecover(hashedSignature, v, r, s);

        require(expectedSigner == signer, "Invalid signature");
    }

    function verifyHash(
        bytes32 messageHash,
        uint bondId
    ) private {
        bytes32 message = keccak256(abi.encodePacked(Strings.toString(bondId)));

        require(message == messageHash, "Hashed message does not match");
    }

    //============== Liquidate bond ==============

}
