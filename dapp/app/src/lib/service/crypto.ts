import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export async function signBond(account: string, bondId: number): Promise<string> {
  const messageBytes = web3.utils.utf8ToHex(String(bondId));
  const hashToSign = web3.utils.keccak256(messageBytes);

  return await web3.eth.sign(Web3.utils.toHex(hashToSign), account);
}

export async function getFirstAccount() {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  console.log(account);
  return account;
}
