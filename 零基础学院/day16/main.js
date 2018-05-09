window.onload = function () {
    let oTitle = document.getElementById("title");
    let oName = document.getElementById("name");

    let aName = oName.innerHTML;
    oTitle.onclick = function () {

        alert("这是 " + aName + " 的个人简历！");
    };
};
