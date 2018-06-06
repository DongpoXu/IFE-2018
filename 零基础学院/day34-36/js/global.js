//定义柱子颜色
let color = ['#60ACFC', '#32D3EB', '#5BC49F', '#FEB64D', '#ff7c7c', '#9287e7', '#68b6FF', '#22C3DB', '#4bb48f'];

function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload !== "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

// export {addLoadEvent};