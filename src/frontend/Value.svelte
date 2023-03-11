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
        // console.log(str);
        //
        // if (typeof str !== "string") {
        //     return false
        // }
        // let reGex = new RegExp(/^(\d|e|\.|-|\+)+$/);
        // return reGex.test(str);

        return (typeof str === "number");
    }
</script>
<div
        class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-md sm:p-6 lg:p-8 m-2"
>
    <div class="text-gray-500">
        <h3 class="text-lg text-gray-900 cursor-default" title="{name}">
            {#if value === null || (!isConnected)}
                <s>{shortName}</s>
            {:else}
                {shortName}
            {/if}
        </h3>
        <p class="mt-2 cursor-default">
            {#if value !== null}
                {#if isNumeric(value)}
                    {value.toFixed(5)}
                {:else}
                    {value}
                {/if}
            {/if}
        </p>
    </div>
</div>