function blurBackground() {
    let body = document.querySelector("#background");
    body.classList.toggle("blur")
    document.querySelector("body").classList.toggle("no-scroll")
}

function toggleRandomecipe() {
    blurBackground()
    let ambushPopup = document.querySelector("#randomecipePopup")
    ambushPopup.classList.toggle("hidden")
}

function toggleAmbush() {
    blurBackground()
    let ambushPopup = document.querySelector("#ambushPopup")
    ambushPopup.classList.toggle("hidden")
}

function toggleWedding() {
    blurBackground()
    let ambushPopup = document.querySelector("#weddingPopup")
    ambushPopup.classList.toggle("hidden")
}