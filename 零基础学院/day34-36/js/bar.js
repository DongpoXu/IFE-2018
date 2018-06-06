//画一组柱形图
function drawBar(data) {
    let barWrapper = document.getElementById("bar-wrapper");
    barWrapper.style.height = "300px";      //设定绘图区域高度
    barWrapper.style.width = "1000px";      //设定绘图区域高度
    let barWidth = 5,      //设定每个柱子的宽度
        spaceWidth = 65,        //定义柱子间隔宽度
        barColor = '#814053';       //定义柱子颜色
    let max = 0, t = 1;
    //拿到柱状图中的最大值Max
    for (let i in data[0]['sale']) {
        if (max < data[0]['sale'][i]) {
            max = data[0]['sale'][i];
        }
    }
    //根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    t = 200 / max;
    let d = data[0]['sale'];
    //绘制横轴及纵轴
    let svgIn = '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">';
    svgIn += "<line x1 = '50' y1 = '50' x2 = '50' y2 = '250' style = 'stroke: black; stroke-width:1'/>";
    svgIn += "<line x1 = '45' y1 = '250' x2 = '100%' y2 = '250' style = 'stroke: black ; stroke-width:1'/>";
    for (let i in d) {
        svgIn += "<rect width = '25' height = " + (d[i] * t) + " " + "fill = " + barColor + " x =" + ((barWidth + spaceWidth) * i + spaceWidth + 22) + " " + "y=" + (249 - d[i] * t) + "></rect>";
        svgIn += "<line x1 = " + (100 + 70 * i) + " y1 = '250' x2 = " + (100 + 70 * i) + " y2 = '255' style = 'stroke:black;stroke-width:1'/>";
    }
    svgIn += '</svg>';
    barWrapper.innerHTML = svgIn;
}

//画多组柱形图
function drawManyBar(data) {
    let barWrapper = document.getElementById("bar-wrapper");
    barWrapper.style.height = "300px";      //设定绘图区域高度
    barWrapper.style.width = "1000px";      //设定绘图区域高度
    let barWidth = 5,      //设定每个柱子的宽度
        spaceWidth = 40,        //定义柱子间隔宽度
        barColor = '#1C86EE';       //定义柱子颜色
    let max = 0, t = 10;
    let prod = Array();
    //拿到柱状图中的最大值Max
    for (let j = 0; j < data.length; j++) {
        for (let i in data[j]['sale']) {
            if (max < data[j]['sale'][i]) {
                max = data[j]['sale'][i];
            }
        }
        if (prod.indexOf(data[j]['product']) === -1) {
            prod.push(data[j]['product']);
        }
    }
    //根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    t = 200 / max;
    let svg_in = '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">';
    svg_in += "<line x1 = '50' y1 = '50' x2 = '50' y2 = '250' style = 'stroke: black; stroke-width:1'/>";
    svg_in += "<line x1 = '45' y1 = '250' x2 = '100%' y2 = '250' style = 'stroke: black ; stroke-width:1'/>";
    for (let j = 0; j < data.length; j++) {
        for (let i in data[j]['sale']) {
            for (let x in prod) {
                if (data[j]['product'] === prod[x]) {
                    barColor = color[j];
                }
            }
            svg_in += "<rect width = '" + barWidth + "' height = " + (data[j]['sale'][i] * t) + " fill = " + barColor + " x =" + ((30 + spaceWidth) * i + barWidth * j + spaceWidth + 50)
                + " y=" + (249 - data[j]['sale'][i] * t) + "></rect>";
        }
    }
    if (data.length > 0) {
        for (let i in data[0]['sale']) {
            //初始坐标为100 ，每个间距为70
            svg_in += "<line x1 = " + (100 + 70 * i) + " y1 = '250' x2 = " + (100 + 70 * i) + " y2 = '255' style = 'stroke:black;stroke-width:1'/>"
        }
    }
    barWrapper.innerHTML = svg_in;
}
