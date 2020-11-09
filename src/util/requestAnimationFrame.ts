const W = window as any;

export const requestAnimationFrame = (function () {
    return W.requestAnimationFrame
        || W.webkitRequestAnimationFrame
        || W.mozRequestAnimationFrame
        || W.oRequestAnimationFrame
        || W.msRequestAnimaitonFrame
        || function(callback: ()=>void){W.setTimeout(callback, 1000/60)};
})();
