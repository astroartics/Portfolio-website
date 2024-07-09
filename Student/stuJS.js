const showNavBtn = document.querySelector('#show');
const showNavDiv = document.querySelector('#showNav');
const navBar = document.querySelector('#navBar');

let navDisplay = 0;

function showNavBar() {
    navBar.style.display = 'none';
    showNavDiv.style.padding = "1vw 0";
    console.log(navDisplay);
    showNavBtn.addEventListener('click', function () {
        showNavBtn.style.display = "none";
        navBar.style.display = "block";
        showNavDiv.style.padding = "0";
        navDisplay = 1;
    });

    document.querySelector('#main').addEventListener('click', function () {
        if (navDisplay) {
            showNavBtn.style.display = "block";
            showNavDiv.style.padding = "1vw 0";
            navBar.style.display = "none";
            navDisplay = 0;
        }
    });

    navBar.addEventListener('click', function () {
        showNavBtn.style.display = "block";
        showNavDiv.style.padding = "1vw 0";
        navBar.style.display = "none";
        navDisplay = 0;
    });
}


window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'laptopCSS.css');
        showNavBar();
    } else {
        link.setAttribute('href', 'mobileCSS.css');
    }

    document.querySelector('head').appendChild(link);
});