document.addEventListener("DOMContentLoaded", function () {

    const DURATION = 5000; //in milliseconds
    const TAB_CLASS = "timeline-tab-link"; // change to your tab class

    let autoRotation;

    const startRotation = () => {
        autoRotation = setInterval(activateNextTab, DURATION);
    };

    const stopRotation = () => {
        clearTimeout(autoRotation);
    };

    // find next tab then activate it
    const activateNextTab = () => {
        let currentTab = document.getElementsByClassName(
            TAB_CLASS + " w--current"
        )[0];
        let nextTab = currentTab.nextSibling ?
            currentTab.nextSibling :
            currentTab.parentElement.firstElementChild; //if next tab is not found, then wrap to first tab

        $("#" + nextTab.id).trigger("click"); //jquery trigger click does not trigger our function
    };

    /* -------------- PAUSE ROTAION IF HOVERED OVER TAB CONTENT -------------- */

    const TAB_CONTENT = document.getElementsByClassName("w-tab-content")[0];

    // stop rotation if user is hovering over tab content
    TAB_CONTENT.addEventListener("mouseover", stopRotation);

    TAB_CONTENT.addEventListener("mouseleave", startRotation);

    // resume rotation and remove hover listener
    const resumeRotation = () => {
        startRotation();
        this.removeEventListener("mouseleave", resumeRotation);
    };

    // temporarily pause rotation until user stops hovering
    const pauseRotation = () => {
        stopRotation();
        this.addEventListener("mouseleave", resumeRotation);
    };

    // if any tab is clicked by user, temporarily stop rotation
    [...document.getElementsByClassName(TAB_CLASS)].forEach(function (element) {
        element.addEventListener("click", pauseRotation);
    });

    // start tab rotation on page load
    startRotation();
});