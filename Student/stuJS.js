const showNavBtn = document.querySelector('#show');
const showNavDiv = document.querySelector('#showNav');
const navBar = document.querySelector('#navBar');
const gmail = document.querySelector('#gmail');
const linkedIn = document.querySelector('#linkedIn');
const emailID = document.querySelector('#emailID');

const toGame = document.querySelector('#toGame');
const tictactoe = document.querySelector('#tictactoe');
const portfolio = document.querySelector('#portfolio');
const unitConverter = document.querySelector('#unitConverter');
const leisure = document.querySelector('#leisure');
const toGameLink = document.querySelector('#toGameLink');
const tictactoeLink = document.querySelector('#tictactoeLink');
const portfolioLink = document.querySelector('#portfolioLink');
const unitConverterLink = document.querySelector('#unitConverterLink');
const leisureLink = document.querySelector('#leisureLink');

let navDisplay = 0;
let emailShow = 0;

function showNavBar() {
    navBar.style.display = 'none';
    showNavDiv.style.padding = "1.5vw 0";

    showNavBtn.addEventListener('click', function () {
        showNavBtn.style.display = "none";
        navBar.style.display = "block";
        showNavDiv.style.padding = "0";
        navDisplay = 1;
    });

    document.querySelector('#main').addEventListener('click', function () {
        if (navDisplay) {
            showNavBtn.style.display = "block";
            showNavDiv.style.padding = "1.5vw 0";
            navBar.style.display = "none";
            navDisplay = 0;
        }
    });

    navBar.addEventListener('click', function () {
        showNavBtn.style.display = "block";
        showNavDiv.style.padding = "1.5vw 0";
        navBar.style.display = "none";
        navDisplay = 0;
    });
}

function reachMe(platform) {
    if (platform == 'gmail') {
        // window.open("https://mail.google.com/mail/?extsrc=mailto&url=mailto%3Asanjanajoshi2023%40gmail.com", '_blank');
        if (emailShow == 0 && isMobileDevice) {
            emailID.style.display = "block";
            emailShow = 1;
            gmail.setAttribute('title', 'Hide email ID');
        } else if (emailShow == 1 && isMobileDevice) {
            emailID.style.display = "none";
            emailShow = 0;
            gmail.setAttribute('title', 'Show email ID');
        }

        if (!isMobileDevice) {
            navigator.clipboard.writeText("sanjanajoshi2023@gmail.com");
            let toast = document.querySelector('#toast');
            toast.style.display = "block";
            setTimeout(function () {
                toast.style.display = "none";
            }, 2000);
        }

    } else if (platform == 'linkedIn') {
        window.open("http://www.linkedin.com/in/sanjana-joshi-533853278", '_blank');
    }
}

function opacityAndGlow(image, show, isLink, link) {
    if (show == 1 && isLink == 1) {
        image.style.opacity = 1;
        image.style.boxShadow = '0 0 0.5vw black';
        image.style.transition = '400ms';
    } else if (show == 0 && isLink == 1) {
        image.style.opacity = 0.5;
        image.style.boxShadow = 'none';
    } else if (show == 1 && isLink == 0) {
        link.style.transition = '200ms';
        link.style.fontWeight = '800';
        link.setAttribute('class', 'increaseFontSize');
    } else if (show == 0 && isLink == 0) {
        link.style.fontWeight = '400';
        link.setAttribute('class', 'normalFontSize');
    }
}

function onProjectLinkHover(link, image) {

    link.addEventListener('mouseover', function () {
        switch (link) {
            case toGameLink: opacityAndGlow(toGame, 1, 1, 0);
                break;

            case tictactoeLink: opacityAndGlow(tictactoe, 1, 1, 0);
                break;

            case portfolioLink: opacityAndGlow(portfolio, 1, 1, 0);
                break;

            case unitConverterLink: opacityAndGlow(unitConverter, 1, 1, 0);
                break;

            case leisureLink: opacityAndGlow(leisure, 1, 1, 0);
                break;
        }
    })

    link.addEventListener('mouseout', function () {
        switch (link) {
            case toGameLink: opacityAndGlow(toGame, 0, 1, 0);
                break;

            case tictactoeLink: opacityAndGlow(tictactoe, 0, 1, 0);
                break;

            case portfolioLink: opacityAndGlow(portfolio, 0, 1, 0);
                break;

            case unitConverterLink: opacityAndGlow(unitConverter, 0, 1, 0);
                break;

            case leisureLink: opacityAndGlow(leisure, 0, 1, 0);
                break;
        }
    })

    image.addEventListener('mouseover', function () {
        switch (image) {
            case toGame: opacityAndGlow(0, 1, 0, toGameLink);
                break;

            case tictactoe: opacityAndGlow(0, 1, 0, tictactoeLink);
                break;

            case portfolio: opacityAndGlow(0, 1, 0, portfolioLink);
                break;

            case unitConverter: opacityAndGlow(0, 1, 0, unitConverterLink);
                break;

            case leisure: opacityAndGlow(0, 1, 0, leisureLink);
                break;
        }
    })

    image.addEventListener('mouseout', function () {
        switch (image) {
            case toGame: opacityAndGlow(0, 0, 0, toGameLink);
                break;

            case tictactoe: opacityAndGlow(0, 0, 0, tictactoeLink);
                break;

            case portfolio: opacityAndGlow(0, 0, 0, portfolioLink);
                break;

            case unitConverter: opacityAndGlow(0, 0, 0, unitConverterLink);
                break;

            case leisure: opacityAndGlow(0, 0, 0, leisureLink);
                break;
        }
    })
}


window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'laptopCSS.css');
        const gameMessageForDevice = document.querySelector('#gameMessageForDevice');
        gameMessageForDevice.style.display = "none";
    } else {
        link.setAttribute('href', 'mobileCSS.css');
    }

    document.querySelector('head').appendChild(link);
    showNavBar();

    gmail.addEventListener('click', function () {
        reachMe('gmail');
    });

    linkedIn.addEventListener('click', function () {
        reachMe('linkedIn');
    })

    onProjectLinkHover(toGameLink, toGame);
    onProjectLinkHover(tictactoeLink, tictactoe);
    onProjectLinkHover(portfolioLink, portfolio);
    onProjectLinkHover(unitConverterLink, unitConverter);
    onProjectLinkHover(leisureLink, leisure);
});