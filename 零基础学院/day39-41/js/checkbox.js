let checkboxList = {
    region: ["华东", "华南", "华北"],
    product: ["手机", "笔记本", "智能音箱"]
};

let lineChart = new LineChart();
let barChart = new BarChart();

function checkboxCreate(checkboxList, attribute) {
    let container = checkboxList[attribute];
    let radioID = attribute + "-radio-wrapper";
    //生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
    let content = "";
    let radioWrapper = document.querySelector("#" + radioID);
    //遍历参数对象
    for (let i in container) {
        content += "<label><input type='checkbox' name='" +
            attribute + "' value='" + container[i] +
            "' checkbox-type = 'child'>" + container[i] + "</label>";
    }
    content += "<label><input type='checkbox' name='" + attribute +
        "' value='全选' checkbox-type = 'all'>全选</label>";
    //容器innerHTML = 生成好的html集合
    radioWrapper.innerHTML = content;

    //给容器做一个事件委托
    radioWrapper.onchange = function (e) {
        if (e.target && e.target.type === "checkbox") {
            let checkedNum = 0;      //选中数量
            let oCheckbox = radioWrapper.querySelectorAll("input[type = 'checkbox']");      //获取input数组
            let oCheckboxAll = oCheckbox[oCheckbox.length - 1];     //获取全选
            let checkboxType = e.target.getAttribute("checkbox-type");      //获取自定义属性
            if (checkboxType === "all") {       //全选对应逻辑
                if (e.target.checked === true) {
                    for (let i = 0; i < oCheckbox.length; i++) {
                        oCheckbox[i].checked = oCheckbox[oCheckbox.length - 1].checked;
                    }
                } else if (e.target.checked === false) {
                    e.target.checked = true;
                }
            } else if (checkboxType === "child") {      //子选项对应逻辑
                for (let i = 0; i < oCheckbox.length - 1; i++) {
                    oCheckbox[i].checked ? checkedNum++ : checkedNum;     //获取选中数量
                }
                if (checkedNum < 1) {
                    e.target.checked = true;
                }
                if (checkedNum === 3) {
                    oCheckboxAll.checked = true;
                }
                if (checkedNum < 3) {
                    oCheckboxAll.checked = false;
                }
            }
        }
        //渲染表格
        renderCheckboxTable(getCheckboxData());
        // lineChart.drawManyLine(getCheckboxData());
        // barChart.drawManyBar(getCheckboxData());
    };
    // 默认渲染"华东-手机"
    radioWrapper.childNodes[3].click();
    // drawBar(getCheckboxData());
}

//获取CheckBox数据并返回
function getCheckboxData() {
    let result = '';
    let data = Array();
    let radioCheckbox = document.querySelectorAll('.container input:checked');
    let fData = JSON.parse(localStorage.getItem('BasicSourceData'));

    //不为全选则添加
    for (let i = 0; i < radioCheckbox.length; i++) {
        if (radioCheckbox[i].value !== "全选") {
            result += radioCheckbox[i].value + ',';
        }
    }

    //查看sourceData中每一项的产品值和地区值是否存在result中包含，包含则说明被选择
    for (let i in sourceData) {
        if (fData !== null) {
            if (result.indexOf(fData[i]['region']) !== -1 && result.indexOf(fData[i]['product']) !== -1 && fData[i]['sale'][0] != null) {
                //console.log('test');
                data.push(fData[i]);
            } else if (result.indexOf(sourceData[i]['region']) !== -1 && result.indexOf(sourceData[i]['product']) !== -1 && fData[i]['sale'][0] == null) {
                data.push(sourceData[i]);
            }
        } else {
            if (result.indexOf(sourceData[i]['product']) !== -1 && result.indexOf(sourceData[i]['region']) !== -1) {
                data.push(sourceData[i]);
            }
        }
    }

    return data;
}


//多表格渲染
function renderCheckboxTable(data) {
    //获取被选取的对象数组作比较用
    let regionChecked = document.querySelectorAll('#region-radio-wrapper input:checked');
    let productChecked = document.querySelectorAll('#product-radio-wrapper input:checked');
    let tableWrapper = document.querySelector("#table-wrapper");

    let countRegion = regionChecked.length;
    let countProduct = productChecked.length;
    // //表头
    let tableHeader = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

    //表格头部
    let tHead = "<thead><tr>";
    //表格体部
    let tBody = "<tbody>";
    if (countRegion === 1 && countProduct === 1) {
        //当商品和地区都只选择一个的情况下，以商品为第一列，地区为第二列
        tHead += '<th>商品</th><th>地区</th>';
        tBody += '<tr mycheck = "' + data[0]['product'] + ',' + data[0]['region'] + '"><td>' + data[0]['product'] + '</td><td>' + data[0]['region'] + '</td>';
        for (let i in data[0]['sale']) {
            tBody += "<td>" + data[0]['sale'][i] + "</td>";
        }
        tBody += "</tr>";
    } else if (countRegion > 1 && countProduct === 1) {
        //当商品选择了一个，地区选择了多个的时候，商品作为第一列，地区作为第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
        tHead += '<th>商品</th><th>地区</th>';
        for (let i in data) {
            tBody += '<tr mycheck = "' + data[i]['product'] + ',' + data[i]['region'] + '">';
            if (i === "0") {
                tBody += "<td rowspan= '" + data.length + "'>" + data[i]['product'] + "</td><td>" + data[i]['product'] + "</td>";
            } else {
                tBody += "<td>" + data[i]['region'] + "</td>";
            }
            for (let j in data[i]['sale']) {
                tBody += "<td>" + data[i]['sale'][j] + "</td>";
            }
            tBody += "</tr>";
        }
    } else if (countRegion === 1 && countProduct > 1) {
        //当地区选择了一个，商品选择了多个的时候，地区作为第一列，商品作为第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
        tHead += '<th>地区</th><th>商品</th>';
        for (let i in data) {
            tBody += '<tr mycheck = "' + data[i]['product'] + ',' + data[i]['region'] + '">';
            if (i === "0") {
                tBody += "<td rowspan= '" + data.length + "'>" + data[i]['region'] + "</td><td>" + data[i]['product'] + "</td>";
            } else {
                tBody += "<td>" + data[i]['product'] + "</td>";
            }
            for (let j in data[i]['sale']) {
                tBody += "<td>" + data[i]['sale'][j] + "</td>";
            }
            tBody += "</tr>";
        }
    } else if (countRegion > 1 && countProduct > 1) {
        //当商品和地区都选择了多于一个的情况下，以商品为第一列，地区为第二列，商品列对同样的商品单元格进行合并
        tHead += '<th>商品</th><th>地区</th>';
        for (let i = 0; i < countProduct; i++) {
            let flag = true;
            let long = countRegion;
            if (countRegion === 4) {
                long = 3;
            }
            for (let j = 0; j < countRegion; j++) {
                for (let dataAttr in data) {
                    if (data[dataAttr]['product'] === productChecked[i].value && data[dataAttr]['region'] === regionChecked[j].value) {
                        tBody += '<tr mycheck = "' + data[dataAttr]['product'] + ',' + data[dataAttr]['region'] + '">';
                        if (flag) {
                            flag = false;
                            tBody += "<td rowspan= '" + long + "'>" + data[dataAttr]['product'] + "</td><td>" + data[dataAttr]['region'] + "</td>";
                        } else {
                            tBody += "<td>" + data[dataAttr]['region'] + "</td>";
                        }
                        for (let saleAttr in data[dataAttr]['sale']) {
                            tBody += "<td>" + data[dataAttr]['sale'][saleAttr] + "</td>";
                        }
                    }
                }
                tBody += "</tr>";
            }
        }
    }
    for (let i = 0; i < 12; i++) {
        tHead += "<th>" + tableHeader[i] + "</th>";
    }
    tHead += '</tr></thead>';
    tBody += "</tbody>";
    tableWrapper.innerHTML = "<table>" + tHead + tBody + "</table>";
    prepareTableOver();
    prepareStorageButton();
    barChart.drawManyBar(getCheckboxData());
    lineChart.drawManyLine(getCheckboxData());
}

//准备图表
function prepareTableOver() {
    //选取位置
    let table = document.querySelector("#table-wrapper");
    //进入列表显示一行数据的图表
    table.onmouseover = function (e) {
        if (e.target && e.target.nodeName.toLowerCase() === 'td') {
            let trow = e.target.parentNode.attributes['mycheck'].nodeValue;
            trow = trow.split(',');
            //显示一行数据
            console.log(trow);
            barChart.drawBar(getMouseOverTableData(trow));
            lineChart.drawLine(getMouseOverTableData(trow));
        }
    };
    //离开列表显示所有数据的图表
    table.onmouseout = function (e) {
        //显示多行数据
        barChart.drawManyBar(getCheckboxData());
        lineChart.drawManyLine(getCheckboxData());
    };

}

//此处应该添加判断LocalStorage中是否存在

//鼠标滑过获取数据
// function getMouseOverTableData(data) {
//     let dat = Array();
//     let fData = JSON.parse(localStorage.getItem('BasicSourceData'));
//     let x = data[1], y = data[0];
//     for (let i in sourceData) {
//         if (fData != null) {
//             if (x.indexOf(fData[i]['region']) !== -1 && y.indexOf(fData[i]['product']) !== -1 && fData[i]['sale'][0] != null) {
//                 //console.log('test');
//                 dat.push(fData[i]);
//             } else if (x.indexOf(sourceData[i]['region']) !== -1 && y.indexOf(sourceData[i]['product']) !== -1 && fData[i]['sale'][0] == null) {
//                 dat.push(sourceData[i]);
//             }
//         } else {
//             if (x.indexOf(sourceData[i]['region']) !== -1 && y.indexOf(sourceData[i]['product']) !== -1) {
//                 dat.push(sourceData[i]);
//             }
//         }
//     }
//     //console.log(dat);
//     return dat;
// }

function getMouseOverTableData(data) {
    let dat = Array();
    let fData = JSON.parse(localStorage.getItem('BasicSourceData'));
    let x = data[1], y = data[0];
    for (let i in sourceData) {
        if (fData != null) {
            if (x.indexOf(fData[i]['region']) !== -1 && y.indexOf(fData[i]['product']) !== -1 && fData[i]['sale'][0] != null) {
                //console.log('test');
                dat.push(fData[i]);
            } else if (x.indexOf(sourceData[i]['region']) !== -1 && y.indexOf(sourceData[i]['product']) !== -1 && fData[i]['sale'][0] == null) {
                dat.push(sourceData[i]);
            }
        } else {
            if (x.indexOf(sourceData[i]['region']) !== -1 && y.indexOf(sourceData[i]['product']) !== -1) {
                dat.push(sourceData[i]);
            }
        }
    }
    //console.log(dat);
    return dat;
}

function prepareStorageButton() {
    let button = document.querySelector('#save-button');
    button.onclick = function (e) {
        document.querySelector('body').click();
        let tr = document.querySelectorAll('#table-wrapper tbody tr');
        let fData = JSON.parse(localStorage.getItem('BasicSourceData'));		//获取local的数组
        if (fData === null || fData[0]['product'] !== '手机') {					//说明没有数组
            fData = Array();							//搞个没有数据的
            let k = 0;
            for (let i in checkboxList['product']) {
                for (let j in checkboxList['region']) {
                    fData[k] = Object();
                    fData[k]['product'] = checkboxList['product'][i];
                    fData[k]['region'] = checkboxList['region'][j];
                    fData[k]['sale'] = Array();
                    k++;
                }
            }
        }
        for (let i = 0; i < tr.length; i++) {							//把当前列表的塞进去
            let check = tr[i].getAttribute('mycheck').split(',');
            let td = tr[i].querySelectorAll('td');
            for (let j = 0; j < fData.length; j++) {
                if (fData[j]['product'] === check[0] && fData[j]['region'] === check[1]) {
                    fData[j]['sale'] = Array();
                    for (let k in td) {
                        if (isNaN(td[k].innerText)) {
                            continue;
                        } else {
                            fData[j]['sale'].push(Number(td[k].innerText));
                        }
                    }
                }
            }
        }
        localStorage.setItem('BasicSourceData', JSON.stringify(fData));
        renderCheckboxTable(getCheckboxData());

        //localStorage.removeItem('BasicSourceData');       //清除localStorage
    }
}

let editFlag = false;       //修改标志位，默认不修改

//选取位置
let table = document.querySelector("#table-wrapper");
//按键按下事件处理
table.onclick = function (e) {
    if (e.target && e.target.nodeName.toLowerCase() === 'td') {
        //点击数据，进入修改模式
        if (!isNaN(e.target.innerHTML) && (editFlag === false)) {
            let text = e.target.innerText;
            let td = e.target;
            td.innerHTML = "<input type = 'text' placeholder=" + text + "><input type = 'button' value = '确认'><input type = 'button' value = '取消'>";
            td.setAttribute('id', 'edit');      //添加修改id
            editFlag = true;
            text = td.querySelector('input[type="text"]');
            text.focus();
            e.stopPropagation();        //阻止事件冒泡
        }
    }
    if (e.target && e.target.nodeName.toLowerCase() === 'input') {
        //点击确认或者取消，switch-case判断处理
        let td = e.target.parentNode;
        let text = td.querySelector('input[type="text"]');
        switch (e.target.value) {
            case "确认":
                if (text.value === text.placeholder || text.value === "") {
                    td.innerText = text.placeholder;
                } else if (text.value !== text.placeholder && text.value !== "" && !isNaN(text.value)) {
                    td.innerHTML = text.value;
                } else {
                    alert("请输入正确内容！");
                    break;
                }
                editFlag = false;
                td.setAttribute('id', '');


                let trow = td.parentNode.attributes['mycheck'].nodeValue;
                trow = trow.split(',');
                console.log(trow);
                //显示一行数据
                barChart.drawBar(getMouseOverTableData(trow));
                lineChart.drawLine(getMouseOverTableData(trow));
                break;
            case "取消":
                td.innerText = text.placeholder;
                editFlag = false;
                td.setAttribute('id', '');
                break;
            default:
                break;
        }
    }
};
//键盘事件处理
table.onkeydown = function (e) {
    switch (e.keyCode) {
        case 27:
            let cancel = table.querySelector('input[value="取消"]');
            //将键盘事件绑定到案件事件
            cancel.click();
            break;
        case 13:
            let affirm = table.querySelector('input[value="确认"]');
            affirm.click();
            break;
    }
};