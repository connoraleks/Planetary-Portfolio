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
const playbar = `<svg width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Layer_2">
    <g>
        <g>
            <path class="st1" d="M134.53,375.59H93.11c-11.19,0-20.26-9.07-20.26-20.26V156.67c0-11.19,9.07-20.26,20.26-20.26h41.42     c11.19,0,20.26,9.07,20.26,20.26v198.67C154.79,366.52,145.72,375.59,134.53,375.59z"/>
        </g>
        <g>
            <path class="st1" d="M426.74,277.5l-164.08,94.73c-16.55,9.56-37.24-2.39-37.24-21.5V161.27c0-19.11,20.69-31.06,37.24-21.5     l164.08,94.73C443.29,244.06,443.29,267.94,426.74,277.5z"/>
        </g>
    </g>
</g>
</svg>`
const github = `<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32">
<path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"/>
</svg>`
const BASE_URL = 'https://api.github.com/users/connoraleks/repos';
const getRepos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        const data = response.data.filter((repo) => repo.fork !== true);
        data.sort((a,b) => (new Date(b.pushed_at) - new Date(a.pushed_at)));
        for(let i = 0; i < 2 || i < data.length; i++){
            $(planets[i]).append(`<h1>${data[i].name}</h1>`).append(`<h6>${data[i].topics.toString().toUpperCase().replaceAll(',', ' | ')}</h6>`).append(`<div><a target="_blank" href="${data[i].homepage}" rel="noopener noreferrer">${playbar}</a><a target="_blank" href="${data[i].html_url}" rel="noopener noreferrer">${github}</a></div>`).append(`<p>${data[i].description}</p>`);
        }
        console.log(data);
    } catch (errors) {
        console.error(errors);
    }
};
getRepos();
