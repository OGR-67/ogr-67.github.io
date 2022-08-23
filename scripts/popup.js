function blurBackground() {
    let background = document.querySelector("#main")
    background.classList.toggle("blur")
    document.querySelector("body").classList.toggle("no-scroll")
}

function togglePopup(project) {
    blurBackground()
    let popup = document.querySelector(`#${project}Popup`)
    popup.classList.toggle("hidden")
}
