/*
 * @Author: cjf
 * @LastEditTime: 2021-09-02
 * @LastEditors: cjf
 * @Description: 根据设计图等比例获取fontsize，以方便rem
 * @FilePath: base.js
 */

document.addEventListener("DOMContentLoaded", function() { // dom加载结束后，计算宽的比例得出body应有的高度
    changeShow();
});

window.onresize = function() { // 当窗口大小发生改变后，计算宽的比例得出body应有的高度
    changeShow();
};

function changeShow() {
    let Standardwidth = 1920; // 设计图宽
    let Standardheight = 930; // 设计图高

    let nowwidth = document.documentElement.clientWidth;
    let nowheight = document.documentElement.clientHeight;
    let Standard = Standardwidth / Standardheight;
    let now = nowwidth / nowheight;
    let width = 0, height = 0;

    if (Standard - now >= 0) { //屏幕宽度铺满
        width = nowwidth;
        height = nowwidth / Standard;
    } else { //屏幕高度铺满
        height = nowheight;
        width = nowheight * Standard;
    }

    let wW = width;// 窗口宽度
    let rem = wW * 100 / Standardwidth;
    let size = rem;

    if (size < 60) {
        size = 60
    }

    document.querySelector("html").setAttribute("style", "font-size:" + size + "px;" +
        "width:100%;" +
        "height:100%");
}
