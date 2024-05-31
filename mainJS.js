const image = document.querySelector("#background");
let recruiter = document.querySelector("#recruiter");
let student = document.querySelector("#student");
let other = document.querySelector("#other");
const whoIsThis = document.querySelector("#whoIsThis");
const time = document.querySelector("#time");

function dateTime() {
    let now = new Date();
    let currentDateTime = now.toLocaleString();
    time.innerText = currentDateTime;
}

setInterval(dateTime, 1000);

function onHover(imageObj) {

    imageObj.addEventListener('mouseover', function () {
        let src = imageObj.getAttribute('src');
        if (src == 'recruiter2.png') {
            imageObj.setAttribute('src', 'recruiter.png');
        } else if (src == 'student2.png') {
            imageObj.setAttribute('src', 'student.png');
        } else if (src == 'other2.png') {
            imageObj.setAttribute('src', 'other.png');
        }
    });

    imageObj.addEventListener('mouseout', function () {
        let src = imageObj.getAttribute('src');
        if (src == 'recruiter.png') {
            imageObj.setAttribute('src', 'recruiter2.png');
        } else if (src == 'student.png') {
            imageObj.setAttribute('src', 'student2.png');
        } else if (src == 'other.png') {
            imageObj.setAttribute('src', 'other2.png');
        }
    });
}

window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'mainCSS1.css');
    } else {
        link.setAttribute('href', 'mainCSS2.css');
    }

    document.querySelector('head').appendChild(link);

    onHover(recruiter);
    onHover(student);
    onHover(other);

    dateTime();

    window.addEventListener("orientationchange", function () {
        window.location.reload();
    });

    document.addEventListener('contextmenu', function (e) {
        //e.preventDefault(); 
    });
})