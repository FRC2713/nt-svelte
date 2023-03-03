<script lang="ts">
    import {NetworkTables, NetworkTablesTypeInfo} from "ntcore-ts-client";

    export let instance: NetworkTables;

    export let name: string;

    export let type: NetworkTablesTypeInfo;

    let value = null;

    const TOPIC = instance.createTopic<number>(name, type);

    TOPIC.subscribe((val) => {
        value = val;
    }, true);
</script>
<p>
    {#if value === null}
        <s>{name}</s>
    {:else}
        {name}: {value}
    {/if}
</p>
