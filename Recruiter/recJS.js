const container = document.querySelector('#container');
const showNavBtn = document.querySelector('#show');
const showNavDiv = document.querySelector('#showNav');
const navBarPhone = document.querySelector('#navBarForPhone');
const navBarPC = document.querySelector('#navBarForPC');
const introductionAnim = document.querySelector('#introductionAnim');
const resumeImg = document.querySelector('#resumeImg');
const resumeHoverDiv = document.querySelector('#resumeHover');
const showProjects = document.querySelector('#showProjects');
const gmail = document.querySelector('#gmailImg');
const linkedIn = document.querySelector('#linkedInImg');
const viewTicTacToe = document.querySelector('#viewTicTacToe');
const hideTicTacToe = document.querySelector('#hideTicTacToe');
const viewLeisure = document.querySelector('#viewLeisure');
const hideLeisure = document.querySelector('#hideLeisureActiviteas');
const viewUnitConverter = document.querySelector('#viewUnitConverter');
const hideUnitConverter = document.querySelector('#hideUnitConverter');

let navDisplay = 0;
let i = 0;
let projectsHidden = 0;

function introAnim() {
    let text = "Hello, I am Sanjana.";

    setInterval(function () {
        if (i == (text.length)) {
            introductionAnim.innerText = "";
            i = 0;
        }

        introductionAnim.innerText += text[i++];
    }, 200);
}

function showNavBar() {
    navBarPC.style.display = 'none';
    navBarPhone.style.display = 'none';
    showNavBtn.addEventListener('click', function () {
        showNavBtn.style.display = "none";
        navBarPhone.style.display = "block";
        navDisplay = 1;
    });

    container.addEventListener('click', function () {
        if (navDisplay) {
            showNavBtn.style.display = "block";
            showNavBtn.style.margin = "2vw auto";
            navBarPhone.style.display = "none";
            navDisplay = 0;
        }
    });

    navBarPhone.addEventListener('click', function () {
        showNavBtn.style.display = "block";
        showNavBtn.style.margin = "2vw auto";
        navBarPhone.style.display = "none";
        navDisplay = 0;
    });
}

function resumeHover() {
    resumeImg.addEventListener('mouseover', function () {
        resumeImg.style.display = "none";
        resumeHoverDiv.style.display = "block";
    });

    resumeHoverDiv.addEventListener('mouseout', function () {
        resumeImg.style.display = "block";
        resumeHoverDiv.style.display = "none";
    });
}

function reachMe(platform) {
    if (platform == 'gmail') {
        window.open("https://mail.google.com/mail/?extsrc=mailto&url=mailto%3Ajoshisanjanana114%40gmail.com", '_blank');
    } else if (platform == 'linkedIn') {
        window.open("http://www.linkedin.com/in/sanjana-joshi-533853278", '_blank');
    }
}

window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'recCSS.css');
        resumeHover();
    } else {
        link.setAttribute('href', 'mobileCSS.css');
        showNavBar();
    }

    document.querySelector('head').appendChild(link);
    introAnim();

    resumeHoverDiv.addEventListener('click', function () {
        window.location = "Resume/resume.html";
    });

    showProjects.addEventListener('click', function () {
        const p2 = document.querySelector('#p2');
        const p3 = document.querySelector('#p3');
        const p4 = document.querySelector('#p4');
        const p5 = document.querySelector('#p5');

        if (projectsHidden == 1) {
            p2.style.display = "block";
            p3.style.display = "block";
            p4.style.display = "block";
            p5.style.display = "block";

            showProjects.innerText = "Show less";
            projectsHidden = 0;
        } else {
            p2.style.display = "none";
            p3.style.display = "none";
            p4.style.display = "none";
            p5.style.display = "none";

            showProjects.innerText = "Show more";
            projectsHidden = 1;
        }
    });

    gmail.addEventListener('click', function () {
        reachMe('gmail');
    });

    linkedIn.addEventListener('click', function () {
        reachMe('linkedIn');
    })

    const TicTacToe = document.querySelector('#p1_video');
    viewTicTacToe.addEventListener('click', function () {
        TicTacToe.style.display = "block";
        viewTicTacToe.style.display = 'none';
        hideTicTacToe.style.display = 'block';
    });

    hideTicTacToe.addEventListener('click', function () {
        TicTacToe.style.display = "none";
        viewTicTacToe.style.display = 'block';
        hideTicTacToe.style.display = 'none';
    });


    const UnitConverter = document.querySelector('#p2_video');
    viewUnitConverter.addEventListener('click', function () {
        UnitConverter.style.display = "block";
        viewUnitConverter.style.display = 'none';
        hideUnitConverter.style.display = 'block';
    });

    hideUnitConverter.addEventListener('click', function () {
        UnitConverter.style.display = "none";
        viewUnitConverter.style.display = 'block';
        hideUnitConverter.style.display = 'none';
    });


    const Leisure = document.querySelector('#p3_video');
    viewLeisure.addEventListener('click', function () {
        Leisure.style.display = "block";
        viewLeisure.style.display = 'none';
        hideLeisure.style.display = 'block';
    });

    hideLeisure.addEventListener('click', function () {
        Leisure.style.display = "none";
        viewLeisure.style.display = 'block';
        hideLeisure.style.display = 'none';
    });
});