$(document).ready(function () {     //等待DOM元素加载完毕
    let oLabel = $(".form__label");
    let oWrapper = $(".form__wrapper");
    let oInput = $(".form__input");
    let oBtn = $(".btn");

    for (let i = 0; i < 2; i++) {
        oInput.eq(i).focus(function () {
            oLabel.eq(i).css("top", "-15px");
            oLabel.eq(i).css("font-size", "15px");
            oWrapper.eq(i).removeClass("hide_line");
            oWrapper.eq(i).addClass("show_line");
        });
        oInput.eq(i).blur(function () {
            let oVal = oInput.eq(i).val();
            if (oVal === "") {
                oLabel.eq(i).css("top", "");
                oLabel.eq(i).css("font-size", "");
            }
            oWrapper.eq(i).removeClass("show_line");
            oWrapper.eq(i).addClass("hide_line");
            oBtn.addClass("animated infinite");
            if(oInput.eq(0).val() !== "" && oInput.eq(1).val() !== ""){
                oBtn.addClass("pulse");
            }
            else{
                oBtn.removeClass("pulse");
            }
        });
    }
});

