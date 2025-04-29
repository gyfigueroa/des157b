(function(){
    let globalData;
    let currentMonth;
    let currentTitle;
    async function getData(){
        const myMoods = await fetch('data/letterboxd.json');
        const data = await myMoods.json();
        updateInterface(data.films);
        console.log(data);
        console.log(data.films[2]);
        globalData = data;
    }

    function updateInterface(jsonData){
        for(film in jsonData){
            document.querySelector('.film-container').appendChild(formatHTML(jsonData[film]));
            //document.querySelector(`#${currentTitle}`).style.backgroundImage = `"url('images/${currentTitle}.jpg');"`;
            console.log(currentTitle);
            console.log(jsonData[film]);
        }
        
    }

    function formatHTML(film){
        //console.log(film);
        //console.log(film.watchdate);
        currentTitle = formatTitle(film.name);
        
        let dateArray = film.watchdate.split("-");
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let month = months[parseInt(dateArray[1])-1];
        let day = parseInt(dateArray[2]);
        //console.log(dateArray);
        //console.log(month);
        //console.log(day);
        let html = `<div class="film" >
                        <div class="poster-container">
                            <a href="https://www.google.com/search?q=${film.name}" target="_blank" rel=”noopener noreferrer”>
                            <div class="poster" style="background-image: url('images/${currentTitle}.jpg')"">
                                <div class="date">
                                    <p>${day}</p>
                                </div>`;
        if (film.userRating > film.rating){
            html +=             `<div class="star"><i class="fa-solid fa-star"></i></div>`;
        }
        if (currentMonth != month){
            html +=             `<h3 class="month">${month}</h3>`;
            currentMonth = month;
        }
        html +=             `</div>
                            </a>
                            <div class="poster-bg" style="background-image: url('images/${currentTitle}.jpg')"></div>
                        </div>
                    <p class="title">${film.name}, ${film.year}</p>
                    
                </div>`

        const wrapper = document.createElement('div');
        wrapper.innerHTML = html.trim();
        return wrapper.firstChild;
    }

    function formatTitle(title){
        title = title.replaceAll(" ", "-");
        title = title.replaceAll(':', '')
        return title.toLowerCase();
    }
    

    getData()


})()