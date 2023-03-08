<script lang="ts">
  import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";

  export let instance: NetworkTables;

  export let name: string;

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

<p>--- {name} ---</p>
<p>Type: {chooser.type}</p>
<p>
  {#if chooser.selected === null || chooser.selected === ""}
    <s>{name}</s>
  {:else}
    {name}:
  {/if}
  <select bind:value="{chooser.selected}" on:change="{update}">
    {#if chooser.options !== null}
      {#each chooser.options as option}
        <option>{option}</option>
      {/each}
    {/if}
  </select>
</p>
