<!--<script src="https://cdn.jsdelivr.net/npm/d3-array@3"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-color@3"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-format@3"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-interpolate@3"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-time@3"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-time-format@4"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-scale@4"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-selection@3"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/d3-axis@3"></script>-->
<!--<script src="https://huww98.github.io/TimeChart/dist/timechart.min.js"></script>-->
<!--<div id="chart" style="width: 100%; height: 640px;"></div>-->
<!--<script>-->
<!--    const el = document.getElementById('chart');-->
<!--    const data = [];-->
<!--    for (let x = 0; x < 100; x++) {-->
<!--        data.push({x, y: Math.random()});-->
<!--    }-->
<!--    const chart = new TimeChart(el, {-->
<!--        series: [{ data }],-->
<!--    });-->
<!--</script>-->
<div>
    <canvas style="width: 100%;" id="my_canvas"></canvas>
</div>
<script lang="ts">
    import { WebglPlot, WebglLine, ColorRGBA } from "webgl-plot";
    const canvas = document.getElementById("my_canvas") as HTMLCanvasElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = document.body.clientWidth * devicePixelRatio;
    canvas.height = document.body.clientHeight * devicePixelRatio;

    const numX = canvas.width;
    const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
    const line = new WebglLine(color, numX);
    const wglp = new WebglPlot(canvas);

    line.arrangeX();
    wglp.addLine(line);

    function update(): void {
        const freq = 0.001;
        const amp = 0.5;
        const noise = 0.1;

        for (let i = 0; i < line.numPoints; i++) {
            const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
            const yNoise = Math.random() - 0.5;
            line.setY(i, ySin * amp + yNoise * noise);
        }
    }

    function newFrame(): void {
        update();
        wglp.update();
        window.requestAnimationFrame(newFrame);
    }

    window.requestAnimationFrame(newFrame);
</script>