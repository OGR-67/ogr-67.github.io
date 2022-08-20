function blurBackground() {
    let background = document.querySelector("#main")
    background.classList.toggle("blur")
    document.querySelector("body").classList.toggle("no-scroll")
}

function toggleRandomecipePopup() {
    blurBackground()
    let popup = document.querySelector("#randomecipePopup")
    popup.classList.toggle("hidden")
}

function toggleAmbushPopup() {
    blurBackground()
    let popup = document.querySelector("#ambushPopup")
    popup.classList.toggle("hidden")
}

function toggleWeddingPopup() {
    blurBackground()
    let popup = document.querySelector("#weddingPopup")
    popup.classList.toggle("hidden")
}

