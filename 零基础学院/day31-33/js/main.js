//思路：表单变化时通知表格进行渲染，但不关注用什么数据渲染

let regionSelect = document.getElementById("region-select");
let productSelect = document.getElementById("product-select");
let tableWrapper = document.getElementById("table-wrapper");

//绑定改变事件
productSelect.addEventListener("change", ChangeEvent);
regionSelect.addEventListener("change", ChangeEvent);

function ChangeEvent() {
    let data = getDataBySelect(); //筛选表格获取数据
    tableWrapper.innerHTML = renderTable(data);   //渲染表格
}

//根据select选项获取数据
function getDataBySelect() {
    //获取选项值
    let regionSelectValue = regionSelect.options[regionSelect.selectedIndex].value;
    let productSelectValue = "";    //设定默认值为空
    if (productSelect.selectedIndex !== 0) {
        productSelectValue = productSelect.options[productSelect.selectedIndex].value;
    }
    let arr = []; //返回数组

    //遍历sourceData
    for (let i = 0; i < sourceData.length; i++) {
        if (productSelectValue !== "") {
            if (sourceData[i].region === regionSelectValue && sourceData[i].product === productSelectValue) {
                arr.push(sourceData[i]);
            }
        } else {
            if (sourceData[i].region === regionSelectValue) {
                arr.push(sourceData[i]);
            }
        }
    }
    return arr;
}

//渲染表格
function renderTable(data) {
    let temp = ``;

    if (data.length === 0) { //对输入数据进行判断
        return;
    }

    temp += `<table border="1">`;   //添加表格
    temp += `
        <thead>
            <tr>
                <td>商品</td>
                <td>地区</td>
                <td>1月</td>
                <td>2月</td>
                <td>3月</td>
                <td>4月</td>
                <td>5月</td>
                <td>6月</td>
                <td>7月</td>
                <td>8月</td>
                <td>9月</td>
                <td>10月</td>
                <td>11月</td>
                <td>12月</td>
            </tr>
        </thead>`;
    //循环输入的数组
    for (let i = 0; i < data.length; i++) {
        temp += `<tr>`; //添加一行表格

        //遍历属性值
        for (let attr in data[i]) {
            //判断是否为数组，以此来取出每月的sale信息
            if (data[i][attr] instanceof Array) {
                for (let j = 0; j < data[i][attr].length; j++) {
                    temp += `<td>${data[i][attr][j]}</td>`;
                }
            } else {
                temp += `<td>${data[i][attr]}</td>`;
            }
        }
        temp += `</tr>`;
    }
    temp += `</table>`;
    return temp;
}