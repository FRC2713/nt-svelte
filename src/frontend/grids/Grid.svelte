<script lang="ts">
    import {NodeTypes} from "./NodeTypes";
    import Node from "./Node.svelte";

    let nodes = [
        // Filled?, Type, Suggested?
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.HYBRID, false],

        [false, NodeTypes.CUBE, false],
        [false, NodeTypes.CUBE, false],
        [false, NodeTypes.HYBRID, false],

        [false, NodeTypes.CONE, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.HYBRID, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.HYBRID, false],

        [false, NodeTypes.CUBE, false],
        [false, NodeTypes.CUBE, false],
        [false, NodeTypes.HYBRID, false],

        [false, NodeTypes.CONE, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.HYBRID, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.HYBRID, false],

        [false, NodeTypes.CUBE, false],
        [false, NodeTypes.CUBE, false],
        [false, NodeTypes.HYBRID, false],

        [false, NodeTypes.CONE, false],
        [false, NodeTypes.CONE, false],
        [false, NodeTypes.HYBRID, false],
    ];

    $: {
        for(let i: number = 0; i < nodes.length; i++) {
            nodes[i];
        }

        generateSuggestions();
    }
    function generateSuggestions() {
        let canUse = [];
        for(let i: number = 0; i < nodes.length; i = i + 9) {

            let nodesInSection = [i, i + 3, i + 6];

            let positiveCount = 0;
            for(let j: number = 0; j < nodesInSection.length; j++) {
                if(nodes[nodesInSection[j]][0]) {
                    positiveCount++;
                }
                if(!(nodes[nodesInSection[j]][0])) {
                    canUse.push(nodesInSection[j]);
                }
            }

            if(positiveCount > 0 && positiveCount < 3) {
                break;
            }
        }
        if(canUse.length <= 0) {
            for(let i: number = 1; i < nodes.length; i = i + 9) {

                let nodesInSection = [i, i + 3, i + 6];

                let positiveCount = 0;
                for(let j: number = 0; j < nodesInSection.length; j++) {
                    if(nodes[nodesInSection[j]][0]) {
                        positiveCount++;
                    }
                    if(!(nodes[nodesInSection[j]][0])) {
                        canUse.push(nodesInSection[j]);
                    }
                }

                if(positiveCount > 0 && positiveCount < 3) {
                    break;
                }
            }
        }
        if(canUse.length <= 0) {
            for (let i: number = 2; i < nodes.length; i = i + 9) {

                let nodesInSection = [i, i + 3, i + 6];

                let positiveCount = 0;
                for (let j: number = 0; j < nodesInSection.length; j++) {
                    if (nodes[nodesInSection[j]][0]) {
                        positiveCount++;
                    }
                    if (!(nodes[nodesInSection[j]][0])) {
                        canUse.push(nodesInSection[j]);
                    }
                }

                if (positiveCount > 0 && positiveCount < 3) {
                    break;
                }
            }
        }
        // for(let i: number = 0; i < nodes.length; i++) {
        //     if(!nodes[i][0]) {
        //         canUse.push(i);
        //     }
        // }
        //
        // console.log("canUse", canUse);

        // Reset
        for(let i: number = 0; i < nodes.length; i++) {
            nodes[i][2] = false;
        }

        if(canUse.length > 0) {
            console.log("canUse", canUse);
            nodes[canUse[0]][2] = true;
        }
    }

    // $: {
    //     for (let i: number = 0; i < nodes.length; i++) {
    //         // console.log("node " + i + " = " + nodes[i][0]);
    //     }
    //     generateSuggestions();
    // }

    setTimeout(() => {
        nodes[0][0] = true;
    }, 5000)
</script>
<div class="grid grid-rows-3 grid-flow-col gap-4">
    {#each nodes as node}
        <Node type={node[1]} bind:suggested={node[2]} bind:filled={node[0]}></Node>
    {/each}
</div>