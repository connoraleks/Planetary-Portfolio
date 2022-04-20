/*
This jquery statement listens for scrolls on the body element
and checks whether or not the navbar has reached the top of the first element
if so it should have a transparent-black background, otherwise transparent

Also listens for when to reveal the planets
*/
const planets = ["#planet1", "#planet2", "#planet3"];
$("body").scroll(function() {
    let scrollTop = $("#titlebox").offset().top;
    if ( scrollTop <= ($("#nav").offset().top + 48)) $("#nav").css( "background", "rgba(0,0,0, 0.95)" ).css("box-shadow", "-5px 5px 2.5px black");
    else $("#nav").css( "background", "transparent" ).css("box-shadow", "none");

    for(let i = 0; i < planets.length; i++){
        if (($(planets[i]).offset().top * 1.5) <= (window.scrollY + (window.innerHeight*0.55)) && $(planets[i]).hasClass('hidden')){
            $(planets[i]).removeClass('hidden');
            //Left side
            if(i % 2 == 0) $(planets[i]).css('animation', 'slide-left 1.5s');
            //Right side
            else $(planets[i]).css('animation', 'slide-right 1.5s');
        }
    }

    let homelink = $("#homelink"), planetslink = $("#planetslink"), contactlink = $("#contactlink");
    if(homelink.hasClass('hidden')){
        homelink.css('animation', 'fadeIn 2s');
        window.setTimeout(() => homelink.removeClass("hidden"), 2000);
        planetslink.css('animation', 'fadeIn 2s 0.5s');
        window.setTimeout(() => planetslink.removeClass("hidden"), 2500)
        contactlink.css('animation', 'fadeIn 2s 1s');
        window.setTimeout(() => contactlink.removeClass("hidden"), 3000)
    }
});
/*
This function reveals elements in the landing page
*/        
(function($){
    let title1a = $("#title1a");
    let title1b = $("#title1b");
    let title2 = $("#title2");
    let title3a = $("#title3a");
    let title3b = $("#title3b");

    title1a.css('animation', 'fadeIn 1s');
    title1b.css('animation', 'fadeIn 1s 2s');
    title2.css('animation', 'fadeIn 1s 4s');
    title3a.css('animation', 'fadeIn 1s 6s');
    title3b.css('animation', 'fadeIn 1s 8s');

    window.setTimeout(() => title1a.toggleClass("hidden"), 1000)
    window.setTimeout(() => title1b.toggleClass("hidden"), 3000)
    window.setTimeout(() => title2.toggleClass("hidden"), 5000)
    window.setTimeout(() => title3a.toggleClass("hidden"), 7000)
    window.setTimeout(() => title3b.toggleClass("hidden"), 9000)

})(jQuery)
const BASE_URL = 'https://api.github.com/users/connoraleks/repos';
const getRepos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        const data = response.data.filter((repo) => repo.fork !== true);
        data.sort((a,b) => (new Date(b.pushed_at) - new Date(a.pushed_at)));
        for(let i = 0; i < 2 || i < data.length; i++){
            $(planets[i]).append(`<h1>${data[i].name}</h1>`).append(`<h6>${data[i].topics.toString().toUpperCase().replaceAll(',', ' | ')}</h6>`).append(`<div><a target="_blank" href="${data[i].homepage}" rel="noopener noreferrer">Demo Link</a><a target="_blank" href="${data[i].html_url}" rel="noopener noreferrer">GitHub Link</a></div>`).append(`<p>${data[i].description}</p>`);
        }
        console.log(data);
    } catch (errors) {
        console.error(errors);
    }
};
getRepos();