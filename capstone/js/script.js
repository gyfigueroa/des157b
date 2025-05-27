let globalData;
async function getData(){
        const myMoods = await fetch('./tweets.json');
        const data = await myMoods.json();
        const tweets = data.tweets
        updateInterface(tweets);
        console.log(tweets);
        console.log(tweets[1].URL);
        globalData = data;
    }

getData();

let tweets = document.querySelectorAll(".tweet");
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

function qsa(query){
    return document.querySelectorAll(query);
}

function qs(query){
    return document.querySelector(query);
}

function updateInterface(json){
    let tweets = qsa(".tweet");
    for (let i = 0; i < tweets.length; i++){
        if (json[i]){
            formatTweet(tweets[i], json[i]);
        }
    }
}





function formatTweet(tweet, json){
    let html = `<a class="wrapper" href="${json.URL}">
                    <div class="pfp" style="background-image:  url(${json.pfpURL})"></div>
                    <div class="content">                
                        <div class="user">
                            <p class="name">${json.displayname}</p>
                            <p class="username">${json.username}</p>
                            <p class="username">• ${json.date}</p>
                        </div>
                        
                        <p>${json.content}</p>
                        <img class="image" src="${json.imgURL}">
                        
                        <div class="stats">
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
                    </div>
                </a>`
    tweet.innerHTML = "";
    tweet.innerHTML = html;
    console.log(json.displayname, json.imgURL);



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

