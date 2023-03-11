<script lang="ts">
  import { NetworkTables, NetworkTablesTypeInfo } from "ntcore-ts-client";

  export let instance: NetworkTables;

  export let name: string;

  export let type: NetworkTablesTypeInfo;

  export let value = null;

  const TOPIC = instance.createTopic<number>(name, type);

  TOPIC.subscribe((val) => {
    value = val;
  }, true);
</script>
<div class="border-2 border-sky-500 grid-item">
<p>
  {#if value === null}
    <s>{name}</s>
  {:else}
    {name}: {value}
  {/if}
</p>
</div>