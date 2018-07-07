//共享onload      由 “Simon Willison” 编写
function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload !== "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

export {addLoadEvent};