<script lang="ts">
    import {ethers} from "ethers";
    import { goto } from '$app/navigation';
    import {onMount} from 'svelte'


    onMount(async () => {
        if (window.ethereum === undefined) {
            alert("Please install MetaMask to use this dApp!");
            return;
        }

        try {
            await window.ethereum.enable();
            goto("/dashboard");
        } catch (error) {
            throw error;
        }
    })


</script>

<div>

    <p>Hello world</p>

</div>