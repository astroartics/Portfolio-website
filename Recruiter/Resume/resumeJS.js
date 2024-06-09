const iframe = document.querySelector('iframe');

window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'resumeCSS.css');
    } else {
        link.setAttribute('href', 'resumeCSSPhone.css');
    }

    document.querySelector('head').appendChild(link);
});