<script lang="ts">
    import {NodeTypes} from "./NodeTypes";

    export let type: NodeTypes;

    export let filled = false;

    export let suggested = false;

</script>
<div on:click={() => {filled = !filled}} class="{filled ? 'bg-red-500' : (suggested ? 'bg-green-600' : 'bg-gray-400')} border-2 border-sky-500 p-6">
    {#if type === NodeTypes.CONE}
        <img src="./assets/cone.png" alt="CONE"/>
    {:else if type === NodeTypes.CUBE}
        <img src="./assets/cube.png" alt="CUBE"/>
    {:else}
        <img src="./assets/hybrid.png" alt="HYBRID"/>
    {/if}
</div>