<script lang="ts">
    import {NetworkTables, NetworkTablesTypeInfo} from "ntcore-ts-client";

    export let instance: NetworkTables;

    export let name: string;

    export let isConnected: boolean;

    let shortName: string;

    $: shortName = name.split("/").pop();

    export let type: NetworkTablesTypeInfo;

    export let value = null;

    const TOPIC = instance.createTopic<number>(name, type);

    TOPIC.subscribe((val) => {
        value = val;
    }, true);

    function isNumeric(str) {
        return (typeof str === "number");
    }
</script>
<span class="cursor-default" title="{shortName}">
<!--{#if value === null || (!isConnected)}-->
<!--    <s>{shortName}</s>-->
<!--{:else}-->
<!--    {shortName}:-->
<!--{/if}-->
{#if value !== null || (!isConnected)}
    {#if isNumeric(value)}
        {value.toFixed(2)}
    {:else}
        {value}
    {/if}
{:else}
    <s>{shortName}</s>
{/if}
</span>