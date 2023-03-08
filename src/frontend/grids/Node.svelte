<script lang="ts">
    import {NodeTypes} from "./NodeTypes";

    export let type: NodeTypes;

    export let filled = false;

    export let suggested = false;

</script>
<div on:click={() => {filled = !filled}} class="{filled ? 'bg-red-500' : (suggested ? 'bg-green-600' : 'bg-gray-400')} border-2 border-sky-500 p-6">
    {#if type === NodeTypes.CONE}
        <img src="https://www.onlygfx.com/wp-content/uploads/2021/12/traffic-cone-clipart.png"/>
    {:else if type === NodeTypes.CUBE}
        <img src="https://www.pngkey.com/png/full/1-11952_glowing-cube-png-clipart-free-eco-furniture-hire.png"/>
    {:else}
        <h1 class="text-white">*</h1>
    {/if}
</div>