addLoadEvent(lineChart.prepareCanvas());

addLoadEvent(checkboxCreate(checkboxList, 'region'));
addLoadEvent(checkboxCreate(checkboxList, 'product'));
addLoadEvent(LocationHash());
addLoadEvent(clickCheckBox());

function LocationHash(){
    //初始默认空
    let FABC='';
    let FDEF='';


    //分别获取btn和wrapper
    let oBtnABC = document.querySelectorAll("#hashABC button");
    let oBtnDEF = document.querySelectorAll("#hashDEF button");
    let oContABC = document.getElementById("contABC");
    let oContDEF = document.getElementById("contDEF");

    for (let i = 0; i < oBtnABC.length; i++) {
        oBtnABC[i].onclick = function () {
            FABC = this.innerHTML;
            location.hash = FABC + "," +FDEF;
        }
    }
    for (let i = 0; i < oBtnDEF.length; i++) {
        oBtnDEF[i].onclick = function () {
            FDEF = this.innerHTML;
            location.hash = FABC + "," +FDEF;
        }
    }

    renderFun();        //先进行一次渲染

    window.onhashchange = renderFun;

    //解析Hash，获取状态参数
    function resolutionHash(string) {
        let data;
        if (string === "ABC"){
            data = location.hash.split('#')[1].split(',')[0];      //pop()方法会删除数组的最后一个元素并且返回
        }
        if (string === "DEF"){
            data = location.hash.split(',').pop();      //pop()方法会删除数组的最后一个元素并且返回
        }
        console.log(data);
        return data;
    }

    function renderFun() {
        oContABC.innerHTML = resolutionHash("ABC");
        oContDEF.innerHTML = resolutionHash("DEF");
    }
}