
$(document).ready(function (wrapper) {
    (function (doc, win) {
        var docEl = doc.getElementsByClassName(wrapper)[0]||doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if(doc.getElementsByClassName(wrapper)){
                    /*   clientWidth = docEl.style.width.slice(0,-2);*/
                    clientWidth = 750;

                }

                if (!clientWidth) return;
                docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
});





