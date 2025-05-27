(function(){
    console.log('js loaded');
    let colors = ["#d741a7", "#3a1772", "#5398be", "#f2cd5d", "#dea54b", "#1446a0", "#db3069", "#ebebd3", "#a4036f", "#048ba8", "#16db93", "#efea5a", "#f29e4c", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71"];
    
    let bubbles = document.querySelectorAll(".main");
    let intervalId;
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

    function loadBubble(main){
        main.style.background = getRandomElement(colors);
        //main.style.filter =  `blur(${getRandomInt(50,100)})`;
        main.style.width = `${getRandomInt(150,250)}px`
        for (const mini of main.children){
            mini.style.width = `${getRandomInt(70,100)}px`;
            mini.style.top = `${getRandomInt(10,90)}%`;
            mini.style.left = `${getRandomInt(10,90)}%`;
            mini.style.background = getRandomElement(colors);
            //mini.style.filter =  `blur(${getRandomInt(50,150)})`;
        }
    }

    function loadBubbles(){
        bubbles.forEach(bubble => {
            loadBubble(bubble);
            bubble.addEventListener("click", () => {
                
                loadBubble(bubble);
                
            });
            console.log("bubble loaded");
        });
        //intervalId = setInterval(loadBubbles, 3000);
    }
    loadBubbles();
    setInterval(loadBubbles, 3000);
})()