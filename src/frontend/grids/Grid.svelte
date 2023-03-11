<script lang="ts">
    import {NodeTypes} from "./NodeTypes";
    import Node from "./Node.svelte";
    import {Score} from "./Score";
    import type {GamePieceMode} from "./GamePieceMode";

    export let gamePieceMode: GamePieceMode;

    let canUse;

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
        for (let i: number = 0; i < nodes.length; i++) {
            nodes[i];
        }
        gamePieceMode;
        generateSuggestions();
    }

    const points = {
        linkComplete: 5,
        high: {
            score: 5,
            linkComplete: 5 + 5,
            linkCouldBeCompleted: 2 + 5
        },
        mid: {
            score: 3,
            linkComplete: 5 + 3,
            linkCouldBeCompleted: 2 + 3
        },
        low: {
            score: 2,
            linkComplete: 5 + 2,
            linkCouldBeCompleted: 2 + 2
        }
    };
    console.log(points);

    let links = [];
    function findLinks(i: number, levelPoints): number {
        // if (nodes[i - 6] && nodes[i - 3] && nodes[i - 9]) {
        //     let nodesInPreviousSection = [i - 9, i - 6, i - 3];
        //     if (nodes[nodesInPreviousSection[0]][0]
        //         && nodes[nodesInPreviousSection[1]][0]
        //         && nodes[nodesInPreviousSection[2]][0]) {
        //             console.log("PREVIOUS GRID", nodesInPreviousSection);
        //             links.push(nodesInPreviousSection);
        //             return true;
        //     }
        // }
        let nodesInSection = [i, i + 3, i + 6];

        let positiveCount = 0;
        for (let j: number = 0; j < nodesInSection.length; j++) {
            if (nodes[nodesInSection[j]][0]) {
                positiveCount++;
            }
        }

        if(positiveCount === 3) {
            return 2;
        }
        if (positiveCount === 2) {
            nodesInSection = nodesInSection.filter(val => (!nodes[val][0]));
            nodesInSection.forEach((node: number) => {
                canUse.push(new Score(node, levelPoints.linkComplete, nodes[node][1]));
            })
        }
        if (positiveCount === 1) {
            nodesInSection = nodesInSection.filter(val => (!nodes[val][0]));
            nodesInSection.forEach((node: number) => {
                canUse.push(new Score(node, levelPoints.linkCouldBeCompleted, nodes[node][1]));
            });
        }

        return 0;
    }

    function generateSuggestions() {
        canUse = [];

        let skipNext;

        skipNext = 0;
        // Top
        for (let i: number = 0; i < (nodes.length - 6); i = i + 3) {
            if (!nodes[i][0]) {
                canUse.push(new Score(i, points.high.score, nodes[i][1]));
            }
            console.log("skip " + skipNext);
            if(skipNext > 0) {
                skipNext--;
                continue;
            }
            skipNext = findLinks(i, points.high);
        }

        // Mid
        for (let i: number = 1; i < (nodes.length - 6); i = i + 3) {
            if (!nodes[i][0]) {
                canUse.push(new Score(i, points.mid.score, nodes[i][1]));
            }
            console.log("skip " + skipNext);
            if(skipNext > 0) {
                skipNext--;
                continue;
            }
            skipNext = findLinks(i, points.mid);
        }

        // Low
        for (let i: number = 2; i < (nodes.length - 6); i = i + 3) {
            if (!nodes[i][0]) {
                canUse.push(new Score(i, points.low.score, nodes[i][1]));
            }
            console.log("skip " + skipNext);
            if(skipNext > 0) {
                skipNext--;
                continue;
            }
            skipNext = findLinks(i, points.low);
        }


        // if(canUse.length <= 0) {
        //     for(let i: number = 1; i < nodes.length; i = i + 9) {
        //
        //         let nodesInSection = [i, i + 3, i + 6];
        //
        //         let positiveCount = 0;
        //         for(let j: number = 0; j < nodesInSection.length; j++) {
        //             if(nodes[nodesInSection[j]][0]) {
        //                 positiveCount++;
        //             }
        //             if(!(nodes[nodesInSection[j]][0])) {
        //                 canUse.push(nodesInSection[j]);
        //             }
        //         }
        //
        //         if(positiveCount > 0 && positiveCount < 3) {
        //             break;
        //         }
        //     }
        // }
        // if(canUse.length <= 0) {
        //     for (let i: number = 2; i < nodes.length; i = i + 9) {
        //
        //         let nodesInSection = [i, i + 3, i + 6];
        //
        //         let positiveCount = 0;
        //         for (let j: number = 0; j < nodesInSection.length; j++) {
        //             if (nodes[nodesInSection[j]][0]) {
        //                 positiveCount++;
        //             }
        //             if (!(nodes[nodesInSection[j]][0])) {
        //                 canUse.push(nodesInSection[j]);
        //             }
        //         }
        //
        //         if (positiveCount > 0 && positiveCount < 3) {
        //             break;
        //         }
        //     }
        // }
        // for(let i: number = 0; i < nodes.length; i++) {
        //     if(!nodes[i][0]) {
        //         canUse.push(i);
        //     }
        // }
        //
        // console.log("canUse", canUse);

        // Reset
        for (let i: number = 0; i < nodes.length; i++) {
            nodes[i][2] = false;
        }

        if (canUse.length > 0) {
            canUse = canUse.sort((a: Score, b: Score): number => {
                if (a.points > b.points) {
                    return -1;
                }
                if (a.points < b.points) {
                    return 1;
                }
                return 0;
            });
            if (gamePieceMode) {
                canUse = canUse.filter((val: Score) => {
                    switch (val.type) {
                        case NodeTypes.CUBE:
                            return "CUBE" === gamePieceMode;
                        case NodeTypes.CONE:
                            return "CONE" === gamePieceMode;
                        default:
                            return true;
                    }
                })
            }
            console.log("canUse", canUse);

            nodes[canUse[0].index][2] = true;
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