<h1>Bounds</h1>
<DataTable style="min-width: 100%;">
  <Head>
    <Row>
      <Cell checkbox>
        <Checkbox />
      </Cell>
      <Cell>Id</Cell>
      <Cell numeric>Value</Cell>
    </Row>
  </Head>
  <Body>
  {#each bonds as bound}
    <Row>
      <Cell checkbox>
        <Checkbox
          bind:group={selected}
          value={bound.id}
          valueKey={bound.amount}
        />
      </Cell>
      <Cell>{bound.id}</Cell>
      <Cell numeric>{bound.amount}</Cell>
    </Row>
  {/each}
  </Body>
</DataTable>
<BoundsConfirm sigs="{sigs}" bind:openModal={openModel} onConfirm="{onConfirm}" />

<Center>
  <Button on:click={signSelectedBonds} variant="raised">Sign Bond</Button>
</Center>

<script lang="ts">

  import { sendGreeting } from "../service/grpc-service";

  interface SignBond {
    id: number;
    amount: string;
    hash: string;
  }

  import type { Bond } from "../service";
  import Checkbox from "@smui/checkbox";
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import Center from "../components/center.svelte";
  import BoundsConfirm from "./bonds-confirm.svelte";
  import Button from "@smui/button";
  import { getFirstAccount, signBond } from "../service/crypto";

  export let bonds: Bond[] = [];

  let selected = [];

  let sigs: SignBond[] = [];

  let openModel: () => void;

  async function signSelectedBonds() {
    const account = await getFirstAccount();
    const selectedBonds = bonds.filter(b => selected.includes(b.id));
    for (const bound of selectedBonds) {
      const hash = await signBond(account, bound.id);
      sigs.push({
        id: bound.id,
        amount: bound.amount,
        hash
      });
    }

    openModel();
  }

  async function onConfirm() {
    // send signed bonds to server over grpc-web
    await sendGreeting();
  }


</script>

