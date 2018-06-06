function prepareCanvas() {
    let lineWrapper = document.getElementById("line-wrapper");
    lineWrapper.innerHTML = "<canvas width = '1000' height = '300'></canvas>";
    lineWrapper.style.height = "300px";
}

//画一条线
function drawLine(data) {
    let canvas = document.querySelector("#line-wrapper canvas");
    let max = 0,
        t = 1;
    for (let i in data[0]['sale']) {
        if (max < data[0]['sale'][i]) {
            max = data[0]['sale'][i];
        }
    }
    t = 200 / max;
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1000, 300);

        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 250);
        ctx.moveTo(45, 250);
        ctx.lineTo(1000, 250);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = color[4];
        for (let i in data[0]['sale']) {
            if (i === "0") {
                ctx.moveTo(100, (250 - data[0]['sale'][i] * t));
            } else {
                ctx.lineTo(100 + 70 * i, (250 - data[0]['sale'][i] * t));
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(100 + 70 * i, (250 - data[0]['sale'][i] * t), 2, 0, 2 * Math.PI, true);
                ctx.fillStyle = color[0];
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(100 + 70 * i, (250 - data[0]['sale'][i] * t));
            }
        }
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

//画多条线
function drawManyLine(data) {
    let canvas = document.querySelector("#line-wrapper canvas");
    let max = 0,
        t = 1;
    for (let j = 0; j < data.length; j++) {
        for (let i in data[j]['sale']) {
            if (max < data[j]['sale'][i]) {
                max = data[j]['sale'][i];
            }
        }
    }
    t = 200 / max;
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1000, 300);

        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 250);
        ctx.moveTo(45, 250);
        ctx.lineTo(1000, 250);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        for (let j = 0; j < data.length; j++) {
            for (let i in data[j]['sale']) {
                if (i === "0") {
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle = color[j];
                    ctx.moveTo(100, (250 - data[j]['sale'][i] * t));
                } else {
                    ctx.lineTo(100 + 70 * i, (250 - data[j]['sale'][i] * t));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(100 + 70 * i, (250 - data[j]['sale'][i] * t), 2, 0, 2 * Math.PI, true);
                    ctx.fillStyle = color[j];
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(100 + 70 * i, (250 - data[j]['sale'][i] * t));
                }
            }
        }
        ctx.stroke();
        ctx.closePath();
    }
}

