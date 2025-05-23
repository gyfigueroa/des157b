(function(){
    console.log('js loaded');
    let colors = ["#d741a7", "#3a1772", "#5398be", "#f2cd5d", "#dea54b", "#1446a0", "#db3069", "#ebebd3", "#a4036f", "#048ba8", "#16db93", "#efea5a", "#f29e4c", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71"];
    
    let bubbles = document.querySelectorAll(".main");
    console.log(bubbles);

    function getRandomElement(array){
        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function loadBubbles(){
        bubbles.forEach(bubble => {
            bubble.style.background = getRandomElement(colors);
            bubble.style.filter =  `blur(${getRandomInt(40,70)})`;
            bubble.style.width = `${getRandomInt(150,250)}px`
            for (const child of bubble.children){
                child.style.width = `${getRandomInt(70,100)}px`;
                child.style.top = `${getRandomInt(10,90)}%`;
                child.style.left = `${getRandomInt(10,90)}%`;
                child.style.background = getRandomElement(colors);
                child.style.filter =  `blur(${getRandomInt(35,100)})`;
            }
        });
    }
    loadBubbles();
    setInterval(loadBubbles, 3500)();
    
})()