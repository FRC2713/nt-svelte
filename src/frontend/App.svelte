<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .good {
        color: green;
    }

    .bad {
        color: red;
    }

</style>

<script lang="ts">
    import Value from "./Value.svelte";
    import {NetworkTables, NetworkTablesTypeInfos} from 'ntcore-ts-client';
    import Chooser from "./Chooser.svelte";

    const INSTANCE = NetworkTables.getInstanceByURI("127.0.0.1", 5810);

    let connection = {
        retries: 0,
        connected: false
    }

    INSTANCE.addRobotConnectionListener((status: boolean): void => {
        if (status) {
            connection.retries = 0;
        } else {
            connection.retries++
        }
        connection.connected = status;
    }, true)
</script>

<main>
    {#if connection.connected}
        <p class="good">Connected</p>
    {:else }
        <p class="bad">Cannot connect, retrying
            {#if connection.retries > 2}
                ({connection.retries})
            {/if}
        </p>
    {/if}
    <Value instance={INSTANCE} name="/AdvantageKit/RealOutputs/RANDOM" type={NetworkTablesTypeInfos.kDouble}></Value>
    <Value instance={INSTANCE} name="/AdvantageKit/RealOutputs/DOESNT EXIST"
           type={NetworkTablesTypeInfos.kString}></Value>
    <Chooser instance={INSTANCE} name="/SmartDashboard/Auto choices"></Chooser>
</main>
