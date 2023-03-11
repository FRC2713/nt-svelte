<script lang="ts">
    import Value from "./Value.svelte";
    import {NetworkTables, NetworkTablesTypeInfos} from "ntcore-ts-client";
    import Chooser from "./Chooser.svelte";
    import Tailwindcss from './Tailwind.svelte';
    import Chart from "./Chart.svelte";
    import Grid from "./grids/Grid.svelte";
    import Colour from "./Colour.svelte";
    import BasicValue from "./BasicValue.svelte";
    // import { readFileSync } from "fs";
    // console.log(readFileSync);
    //
    // let file = readFileSync("C:\\Users\\sidtr\\OneDrive\\Pictures\\test.dsettings", 'utf8');
    let settings = JSON.parse(`{
      "url": "127.0.0.1",
      "port": 5810,
      "fields": [
        "/AdvantageKit/RealOutputs/Game piece mode",
        "/AdvantageKit/SystemStats/BatteryVoltage",
        "/AdvantageKit/RealOutputs/DOESNT EXIST",
        "/AdvantageKit/RealOutputs/4Bar/FF Effort"
      ]
    }`);

    console.log(settings);

    let connection = {
        retries: 0,
        connected: false,
        URL: settings.url,
        port: settings.port
    };

    const INSTANCE = NetworkTables.getInstanceByURI(connection.URL, connection.port);


    INSTANCE.addRobotConnectionListener((status: boolean): void => {
        if (status) {
            connection.retries = 0;
        } else {
            connection.retries++;
        }
        connection.connected = status;
    }, true);


    let mode: null | string = null;

    // element argument can be a selector string
    //   for an individual element
    // let pckry = new Packery( '.pack', {
    //   // options
    // });
</script>

<main>
    <Tailwindcss/>
    <!--{#if connection.connected}-->
    <!--  <p class="text-green-600">Connected</p>-->
    <!--{:else}-->
    <!--  <p class="text-red-600">-->
    <!--    Cannot connect, retrying-->
    <!--    {#if connection.retries > 2}-->
    <!--      ({connection.retries})-->
    <!--    {/if}-->
    <!--  </p>-->
    <!--{/if}-->
    <div class="w-full h-12 shadow-md p-2 border border-gray-100 absolute bottom-0 bg-white">
        {#if connection.connected}
            <span class="text-green-600">Connected</span>
        {:else}
            <span class="text-red-600">
            Cannot connect, retrying
                {#if connection.retries > 2}
              ({connection.retries})
            {/if}
            </span>
        {/if}
        <span class="absolute right-0 mr-1">
        <Colour name="/FMSInfo/IsRedAlliance" instance="{INSTANCE}" bind:isConnected="{connection.connected}"></Colour>
        <BasicValue name="/AdvantageKit/SystemStats/BatteryVoltage" instance="{INSTANCE}"
                    bind:isConnected="{connection.connected}"></BasicValue>V
        <BasicValue name="/AdvantageKit/DriverStation/FMSAttached" instance="{INSTANCE}"
                    bind:isConnected="{connection.connected}"></BasicValue>
        </span>
    </div>
    <div class="flex flex-wrap">
        <!--        <div-->
        <!--                class="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-md sm:p-6 lg:p-8 m-2"-->
        <!--        >-->
        <!--            <div class="text-gray-500">-->
        <!--                <h3 class="text-lg text-gray-900 cursor-default">-->
        <!--                    {#if connection.connected}-->
        <!--                        <p class="text-green-600">Connected</p>-->
        <!--                    {:else}-->
        <!--                        <p class="text-red-600">-->
        <!--                            Cannot connect-->
        <!--                        </p>-->
        <!--                    {/if}-->
        <!--                </h3>-->
        <!--                <p class="mt-2 cursor-default">-->
        <!--                    {#if !connection.connected}-->
        <!--                        Retrying-->
        <!--                        {#if connection.retries > 2}-->
        <!--                            ({connection.retries})-->
        <!--                        {/if}-->
        <!--                    {/if}-->
        <!--                </p>-->
        <!--            </div>-->
        <!--        </div>-->
        {#each settings.fields as field}
            <Value instance="{INSTANCE}" bind:isConnected="{connection.connected}" name="{field}"
                   type="{NetworkTablesTypeInfos.kDouble}"/>
        {/each}
        <Chooser instance="{INSTANCE}" bind:isConnected="{connection.connected}"
                 name="/SmartDashboard/Autonomous Routine"/>
    </div>
    <!--  <Chart/>-->
    <!--  <Grid bind:gamePieceMode={mode} />-->
</main>
