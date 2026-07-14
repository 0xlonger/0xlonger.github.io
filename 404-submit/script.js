function fitIframe() {
    const desktopWrapper = document.getElementById('desktop-wrapper');
    const desktopIframe = document.getElementById('desktop-iframe');

    const mobileWrapper = document.getElementById('mobile-wrapper');
    const mobileIframe = document.getElementById('mobile-iframe');

    desktopIframe.style.transform = `scale(${desktopWrapper.clientWidth / desktopIframe.clientWidth})`;
    mobileIframe.style.transform = `scale(${mobileWrapper.clientWidth / mobileIframe.clientWidth})`;
}

window.addEventListener('resize', fitIframe);
fitIframe();