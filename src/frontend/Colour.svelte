<script lang="ts">
    import {NetworkTables, NetworkTablesTypeInfos} from "ntcore-ts-client";

    export let instance: NetworkTables;

    export let name: string;
    export let isConnected: boolean;
    export let value = null;

    $: colour = ((value === null || !isConnected) ? "black" : (value ? "red" : "blue"));

    // export let valChecker: (val: string) => string;

    const TOPIC = instance.createTopic<boolean>(name, NetworkTablesTypeInfos.kBoolean);

    TOPIC.subscribe((val) => {
        value = val;
    }, true);
</script>
<div style="background-color: {colour}" class="w-5 h-5 inline-block">

</div>