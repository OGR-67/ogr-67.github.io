let zoombellElements = document.querySelectorAll(".social-anim")

for (element of zoombellElements) {
    element.addEventListener("mouseover", function () {
        this.classList.add("zoom-bell")
        this.addEventListener("animationend", () => {
            this.classList.remove("zoom-bell");
        })
    });
}