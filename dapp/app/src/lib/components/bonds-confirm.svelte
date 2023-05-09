<Dialog
  bind:open
  aria-labelledby="event-title"
  aria-describedby="event-content"
>
  <Title id="event-title">Confirm owner transfer of bonds</Title>
  <Content id="event-content">
    Clicking "I understand" will send the bonds to us and allow you to spend up to the amount of the bonds.
  </Content>
  <Actions>
    <Button on:click={onCancel}>
      <Label>Abort</Label>
    </Button>
    <Button on:click={onConfirm} default>
      <Label>I understand</Label>
    </Button>
  </Actions>
</Dialog>

<Button on:click={() => (open = true)}>
  <Label>Open Dialog</Label>
</Button>

<script lang="ts">
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";

  export let onConfirm: () => void;
  export let onCancel: () => void;

  export let openModal = () => {
    open = true;
  };

  let open = false;

</script>
