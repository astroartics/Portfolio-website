window.addEventListener('load', function () {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    isMobileDevice = regexp.test(details);

    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');

    if (!isMobileDevice) {
        link.setAttribute('href', 'certificatePC.css');
    } else {
        link.setAttribute('href', 'certificatePhone.css');
    }

    document.querySelector('head').appendChild(link);
});