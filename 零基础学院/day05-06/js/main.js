window.onload = function () {
    let oLink = document.getElementById("link");
    let oBtn = document.getElementById("bar").getElementsByTagName("button");
    for (let i = 0; i < oBtn.length; i++) {
        oBtn[i].onclick = function () {
            oLink.href = "css/" + this.innerHTML + ".css"
        }
    }
};
