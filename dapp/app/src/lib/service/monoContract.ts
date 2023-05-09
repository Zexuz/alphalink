export interface Bond {
  id: number;
  owner: string;
  amount: string;
}


export class MonoContract {

  private readonly contract: any;

  constructor(
    private readonly address: string,
    private readonly abi: any,
    private readonly web3: any
  ) {
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


  async getBonds(address: string): Promise<Bond[]> {
    const res = await this.contract.methods.getBonds().call({
      from: address
    });
    return res.map((bond: any) => {
      return {
        amount: bond[0],
        id: bond[1],
        owner: bond[2]
      };
    });
  }

  async liqUser(address: string, bondId: number, signature: string) {
    const { r, s, v } = this.web3.eth.accounts.recover(signature);

  }

  async liquidateBond(address: string, bondId: number, hashToSign: string, v: number, r: string, s: string) {
    await this.contract.methods.liquidateBond(bondId, hashToSign, v, r, s).send({
      from: address
    });
  }
}