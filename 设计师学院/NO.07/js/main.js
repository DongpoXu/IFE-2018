$(document).ready(function () {     //等待DOM元素加载完毕
    let oLabel = $(".form__label");
    let oWrapper = $(".form__wrapper");
    let oInput = $(".form__input");

    for (let i = 0; i < 2; i++) {
        oInput.eq(i).focus(function () {
            oLabel.eq(i).css("top", "-10px");
            oLabel.eq(i).css("font-size", "15px");
        });
        oInput.eq(i).blur(function () {
            let oVal = oInput.eq(i).val();
            if (oVal !== null) {
                oLabel.eq(i).css("top", "");
                oLabel.eq(i).css("font-size", "");
            }
        });
    }
});

