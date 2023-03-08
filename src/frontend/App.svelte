<script lang="ts">
  import Value from "./Value.svelte";
  import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";
  import Chooser from "./Chooser.svelte";

  const INSTANCE = NetworkTables.getInstanceByURI("127.0.0.1", 5810);

  let connection = {
    retries: 0,
    connected: false,
  };

  INSTANCE.addRobotConnectionListener((status: boolean): void => {
    if (status) {
      connection.retries = 0;
    } else {
      connection.retries++;
    }
    connection.connected = status;
  }, true);

  import Tailwindcss from './Tailwind.svelte';
  import Chart from "./Chart.svelte";
  import Grid from "./grids/Grid.svelte";
</script>

<main>
  <Tailwindcss/>
  {#if connection.connected}
    <p class="text-green-600">Connected</p>
  {:else}
    <p class="text-red-600">
      Cannot connect, retrying
      {#if connection.retries > 2}
        ({connection.retries})
      {/if}
    </p>
  {/if}
  <Value instance="{INSTANCE}" name="/AdvantageKit/RealOutputs/RANDOM" type="{NetworkTablesTypeInfos.kDouble}" />
  <Value instance="{INSTANCE}" name="/AdvantageKit/RealOutputs/DOESNT EXIST" type="{NetworkTablesTypeInfos.kString}" />
  <Chooser instance="{INSTANCE}" name="/SmartDashboard/Auto choices" />
<!--  <Chart/>-->
  <Grid />
</main>
