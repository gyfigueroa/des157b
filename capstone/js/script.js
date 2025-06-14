(function(){
    console.log("js loaded");

    document.addEventListener("DOMContentLoaded", (event) => {
        gsap.registerPlugin(SplitText);

        document.fonts.ready.then(()=> {
            let split = SplitText.create(".gsap", {
                type: "words",
                mask: "words"
            });

            gsap.from(split.words, {
                y: 100,
                autoAlpha: 0,
                stagger: 0.05
            })

        });
    });


    let globalData;
    async function getData(){
            const myMoods = await fetch('../data/tweets.json');
            const data = await myMoods.json();
            const tweets = data.tweets
            updateInterface(tweets);
            //console.log(tweets);
            //console.log(tweets[1].URL);
            globalData = data;
        }

    getData();

    let tweets = document.querySelectorAll(".tweet");

    /* 

    TWEET DEBUGGING

    for (let tweet of tweets){
        console.log(tweet.children);
    };

    let counter = 0
    let views = document.querySelectorAll(".fa-chart-simple");
    for (let node of views){
        
        console.log(node.nextElementSibling.innerHTML);
        node.nextElementSibling.innerHTML = 666;
        console.log("Node: ", counter);
        counter++;
    }; 

    */

    function qsa(query){
        return document.querySelectorAll(query);
    }

    function qs(query){
        return document.querySelector(query);
    }



    function updateInterface(json){
        for(let i = 0; i < tweets.length; i++){
            if(json[i]){
                formatTweet(tweets[i], json[i]);
            }
        }
    }

    /* 
    Version for specific tweets


    let jsonIndex = [6, 7, 9];

    function updateInterface(json){
        let tweets = qsa(".tweet");
        for (let i = 0; i < tweets.length; i++){
            if (json[i]){
                formatTweet(tweets[i], json[jsonIndex[i]]);
            }
        }
    }
    */



    function formatTweet(tweet, json){
        let html = `<div class="pfp" style="background-image:  url(${json.pfpURL})"></div>
                    <div class="content">                
                        <div class="user">
                            <p class="name">${json.displayname}</p>
                            <p class="username">${json.username}</p>
                            <p class="username">• ${json.date}</p>
                        </div>
                        
                        <p>${json.content}</p>`
        if (json.imgURL && json.imgURL != ""){
            html +=    `<img class="image" src="${json.imgURL}">`;
        }
        
        if (json.quote){
            html +=    `<div class="quote">
                            <div class="quote-content">
                                <div class="quote-user">
                                    <div class="quote-pfp" style="background-image:  url(${json.quote.pfpURL})"></div>
                                    <div class="user">
                                        <p class="quote-name">${json.quote.displayname}</p>
                                        <p class="username">${json.quote.username}</p>
                                        <p class="username">• ${json.quote.date}</p>
                                    </div>
                                </div>
                                <p>${json.quote.content}</p>
                            </div>
                            <img class="quote-image" src="${json.quote.imgURL}">
                        </div>`;
        }
                        
        html +=        `<div class="stats">
                            <div class="stat comments">
                                <i class="fa-regular fa-comment"></i>
                                <p>${json.comments}</p>
                            </div>
                            <div class="stat quotes">
                                <i class="fa-solid fa-retweet"></i>
                                <p>${json.quotes}</p>
                            </div>
                            <div class="stat likes">
                                <i class="fa-regular fa-heart"></i>
                                <p>${json.likes}</p>
                            </div>
                            <div class="stat views">
                                <i class="fa-solid fa-chart-simple"></i>
                                <p>${json.views}</p>
                            </div>
                        </div>
                    </div>`;
        //tweet.innerHTML = "";
        tweet.innerHTML = html;
        //<a class="wrapper" href="${json.URL}"></a>
        //</a>
        /* console.log(json.displayname, json.imgURL); */



    /*     

        <div class="pfp"></div>
        <div class="content">                
            <div class="user">
                <p class="name">Name</p>
                <p class="username">@username</p>
            </div>
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris n</p>
            <div class="image"></div>
            <div class="quote"></div>

            <div class="stats">
                <div class="stat comments">
                    <i class="fa-regular fa-comment"></i>
                    <p>123</p>
                </div>
                <div class="stat quotes">
                    <i class="fa-solid fa-retweet"></i>
                    <p>1.2K</p>
                </div>
                <div class="stat likes">
                    <i class="fa-regular fa-heart"></i>
                    <p>12.3K</p>
                </div>
                <div class="stat views">
                    <i class="fa-solid fa-chart-simple"></i>
                    <p>123K</p>
                </div>
            </div>
        </div> 


        
    */
    }

    let landingTweets = qs("section").querySelectorAll('.tweet');

    function hideLandingTweets(){
        for (let i = 0; i < landingTweets.length; i++){
            if (!landingTweets[i].classList.contains("hidden")){
                console.log(`hiding tweet`);
                landingTweets[i].classList = "tweet hidden";
            }
        }
    }

    function showLandingTweets(){
        for (let i = 0; i < landingTweets.length; i++){
            if (!landingTweets[i].classList.contains("visible")){
                console.log(`showing tweet`);
                landingTweets[i].classList = "tweet visible";
            }
        }
    }

    let bubbles = qs(".background").querySelectorAll(".main");
    bubbles.forEach(bubble => {
        bubble.style.opacity = 0;
    });

    // toggling landing tweets
    enterView({
            selector: '#sec3',
            enter: function(el) {
                //console.log("enter", el);
                hideLandingTweets();
            },
            exit: function(el) {
                //console.log("exit", el);
                showLandingTweets();
                AOS.refresh();
            },
            offset: 0, // enter at middle of viewport
            once: false, // trigger just once
        });



    enterView({
        selector: "#gorilla-card",
        enter: function(){
            bubbles.forEach(bubble => {
                bubble.style.opacity = 1;
            });
        },
        exit: function(){
            bubbles.forEach(bubble => {
                bubble.style.opacity = 0;
            });
        },
        offset: 0,
        once: false,
    });

    enterView({
        selector: "#human-card",
        enter: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(2)";
            });
        },
        exit: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(1)";
            });
        },
        offset: 0,
        once: false,
    });

    enterView({
        selector: "#ai-card",
        enter: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(3)";
            });
        },
        exit: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(2)";
            });
        },
        offset: 0,
        once: false,
    });

    enterView({
        selector: "#sec5",
        enter: function(){
            for (let i = 0; i < bubbles.length; i++ ){
                if(i == bubbles.length-1){
                    bubbles[i].style.borderRadius = "0";
                    bubbles[i].style.transform = "scale(10)";
                }
                else {
                    bubbles[i].style.opacity = 0;
                }
            };
        },
        exit: function(){
            for (let i = 0; i < bubbles.length; i++ ){
                bubbles[i].style.opacity = 1;
                bubbles[i].style.borderRadius = "50%";
                bubbles[i].style.transform = "scale(3)";
            };
        },
        offset: 0,
        once: false,
    });

    enterView({
        selector: "#s6-2",
        enter: function(){
            for (let i = 0; i < bubbles.length; i++ ){
                bubbles[i].style.borderRadius = "50%";
                bubbles[i].style.transform = "scale(1)";
                bubbles[i].style.opacity = 0;
            };
        },
        exit: function(){
            for (let i = 0; i < bubbles.length; i++ ){
                bubbles[i].style.opacity = 1;
                if(i == bubbles.length-1){
                    bubbles[i].style.borderRadius = "0";
                    bubbles[i].style.transform = "scale(10)";
                }
                else {
                    bubbles[i].style.transform = "scale(1)";
                    bubbles[i].style.opacity = 0;
                }
            };
        },
        offset:0,
        once: false,
    });

/*     enterView({
        selector: "#sec10",
        enter: function(){
            AOS.refresh;
            console.log(`AOS Refreshed`);
        },
        offset: 0,
        once: true,
    }); */


    enterView({
        selector: "#event1",
        enter: function(){
            //console.log("entered event1");
            bubbles.forEach(bubble => {
                bubble.style.opacity = 1;
            });
        },
        exit: function(){
            //console.log("exited event1");
            bubbles.forEach(bubble => {
                bubble.style.opacity = 0;
            });
        },
        offset: 0,
        once: false,
    });

    enterView({
        selector: "#event2",
        enter: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(2)";
            });
        },
        exit: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(1)";
            });
        },
        offset: 0,
        once: false,
    });

    enterView({
        selector: "#event3",
        enter: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(3)";
            });
        },
        exit: function(){
            bubbles.forEach(bubble => {
                bubble.style.transform = "scale(2)";
            });
        },
        offset: 0,
        once: false,
    });

    let scrollTimeout;
    const indicator = document.getElementById('scroll-indicator');

    function showIndicator() {
    indicator.classList.add('show');
    }

    function hideIndicator() {
    indicator.classList.remove('show');
    }

    function resetScrollTimer() {
    hideIndicator();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(showIndicator, 3000); // 5 seconds of no scroll
    }

    // Start tracking when page loads
    window.addEventListener('scroll', resetScrollTimer);
    window.addEventListener('load', resetScrollTimer);

    let overlayButton = qs(".overlay-button")

    qs(".overlay-button").addEventListener('click', function(e){
        qs(".overlay").classList.add("hidden");
        console.log("button clicked");
    });

    document.addEventListener("DOMContentLoaded", function(event) {
      window.scrollTo(0, 0);
    });


})();

