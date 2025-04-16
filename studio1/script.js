(function(){
    'use strict'
    let fs = document.querySelector(".fa-expand");
    fs.addEventListener('click', function(){
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    })

    const myVideo = document.querySelector("#myVideo");
    const line1 = document.querySelector("#line1");
    const line2 = document.querySelector("#line2");
    const line3 = document.querySelector("#line3");
    const line4 = document.querySelector("#line4");
    const line5 = document.querySelector("#line5");
    const line6 = document.querySelector("#line6");
    const line7 = document.querySelector("#line7");
    const line8 = document.querySelector("#line8");
    const line9 = document.querySelector("#line9");
    const img1 = document.querySelector("#img1");
    const img2 = document.querySelector("#img2");
    const img3 = document.querySelector('#img3');
    const img4 = document.querySelector("#img4");
    const img5 = document.querySelector("#img5");
    const img6 = document.querySelector('#img6');
    const img7 = document.querySelector("#img7");
    const img8 = document.querySelector("#img8");
    const img9 = document.querySelector('#img9');
    const blank = document.querySelector('#blankline');
    const intervalID = setInterval(checkTime, 500);

    const poem = {
        start: [1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        stop:  [2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30],
        line: [line1, line2, line3, line4, line5, line6, line7, line8, line9, img1, img2, img3, img4, img5, img6, img7, img8, img9, blank]
    }

    function checkTime() {
        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = "showing";
            } else {
                poem.line[i].className = "hidden";
            }
            if (img1.className == "showing") {
                myVideo.style.filter = "contrast(200%) invert(200%) hue-rotate(30deg)";
            }

            

        }
    }
})()