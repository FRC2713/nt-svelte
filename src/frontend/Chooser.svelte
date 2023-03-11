<script lang="ts">
  import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

  export let instance: NetworkTables;

  export let isConnected: boolean;

  export let name: string;

  let shortName: string;

  $: shortName = name.split("/").pop();

  const chooser = {
    type: "",
    selected: "",
    options: [],
    controllable: false,
  };

  let value = null;

  const TYPE = instance.createTopic<string>(name + "/.type", NetworkTablesTypeInfos.kString);
  const SELECTED = instance.createTopic<string>(name + "/selected", NetworkTablesTypeInfos.kString);
  const OPTIONS = instance.createTopic<string[]>(name + "/options", NetworkTablesTypeInfos.kStringArray);
  const CONTROLLABLE = instance.createTopic<boolean>(name + "/.controllable", NetworkTablesTypeInfos.kBoolean);

  TYPE.subscribe((val) => {
    chooser.type = val;
  }, true);

  SELECTED.subscribe((val) => {
    chooser.selected = val;
  }, true);

  SELECTED.publish();

  OPTIONS.subscribe((val) => {
    chooser.options = val;
  }, true);

  CONTROLLABLE.subscribe((val) => {
    chooser.controllable = val;
    console.log(chooser.controllable);
  }, true);

  function update() {
    SELECTED.setValue(chooser.selected);
  }
</script>
<div
        class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-md sm:p-6 lg:p-8 m-2"
>
  <div class="text-gray-500">
    <h3 class="text-lg text-gray-900 cursor-default" title="{name}">
      {#if chooser.selected === null || chooser.selected === "" || !isConnected}
        <s>{shortName}</s>
      {:else}
        {shortName}
      {/if}
    </h3>
    <p class="mt-2 cursor-default">
      <select bind:value="{chooser.selected}" on:change="{update}">
        {#if chooser.options !== null}
          {#each chooser.options as option}
            <option>{option}</option>
          {/each}
        {/if}
      </select>
    </p>
  </div>
</div>
<!--<p>-&#45;&#45; {name} -&#45;&#45;</p>-->
<!--<p>Type: {chooser.type}</p>-->
<!--<p>-->
<!--  {#if chooser.selected === null || chooser.selected === ""}-->
<!--    <s>{name}</s>-->
<!--  {:else}-->
<!--    {name}:-->
<!--  {/if}-->
<!--  <select bind:value="{chooser.selected}" on:change="{update}">-->
<!--    {#if chooser.options !== null}-->
<!--      {#each chooser.options as option}-->
<!--        <option>{option}</option>-->
<!--      {/each}-->
<!--    {/if}-->
<!--  </select>-->
<!--</p>-->
