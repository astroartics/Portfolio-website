window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'compCSS.css');
    } else {
        link.setAttribute('href', 'mobileCSS.css');
    }

    document.querySelector('head').appendChild(link);
});