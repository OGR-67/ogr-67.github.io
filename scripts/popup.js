class PopupButton {

    constructor(buttonData) {
        this.link = buttonData.link;
        this.style = buttonData.style;
        this.text = buttonData.text;
        this.icon = buttonData.icon;
        this.html = this.build();
    }

    build() {
        let html = document.createElement("a");
        html.href = this.link;
        html.setAttribute("target", "_blank");
        html.setAttribute("rel", "noopener noreferrer");
        html.setAttribute("class", `btn btn-${this.style}`);
        html.innerHTML = `${this.icon} ${this.text}`;
        return html;
    }
}


class PopupButtonContainer {

    constructor(data) {
        this.buttonsList = [];
        data.popupButtons.forEach(button => {
            let buttonElement = new PopupButton(button);
            this.buttonsList.push(buttonElement);
        })
        this.html = this.build();
    }

    build() {
        let html = document.createElement("div");
        html.className = "popup-button-container";
        this.buttonsList.forEach(element => html.appendChild(element.html));
        return html;
    }
}


class PopupTechnos {

    constructor(data) {
        this.technosList = data.technos;
        this.html = this.build();
    }

    build() {
        let html = document.createElement("ul");
        html.className = "popup-techno";
        this.technosList.forEach(techno => {
            let li = document.createElement("li");
            li.innerText = techno;
            html.appendChild(li);
        });
        return html;
    }
}


class PopupDescription {

    constructor(data) {
        this.descriptionList = data.popupDescription;
        this.html = this.build();
    }

    build() {
        let html = document.createElement("div");
        html.className = "popup-description";
        this.descriptionList.forEach(paragrah => {
            let p = document.createElement("p");
            p.innerHTML = paragrah
            html.appendChild(p);
        });
        return html;
    }
}


class PopupContent {

    constructor(data) {
        this.techno = new PopupTechnos(data);
        this.description = new PopupDescription(data);
        this.button = new PopupButtonContainer(data);
        this.html = this.build();
    }

    build() {
        let html = document.createElement('div');
        html.className = "popup-content";
        html.appendChild(this.techno.html);
        html.appendChild(this.description.html);
        html.appendChild(this.button.html);
        return html;
    }
}


class PopupTitle {

    constructor(data) {
        this.rawTitle = data.title;
        this.html = this.build();
    }

    build() {
        let html = document.createElement("h2");
        html.className = "popup-title";
        html.innerText = this.rawTitle[0].toUpperCase() + this.rawTitle.substring(1);
        return html;
    }
}


class PopupXmark {

    constructor(data) {
        this.projectTitle = CardTitle.formatTitle(data.title);
        this.html = this.build();
    }

    build() {
        let html = document.createElement('div');
        html.className = "popup-xmark-container";
        let button = document.createElement('button');
        button.className = "popup-xmark";
        button.setAttribute("onclick", `PopupContainer.togglePopup("${this.projectTitle}")`);
        button.setAttribute("aria-label", "Close popup");
        button.innerHTML = '<i class="fa-solid fa-xmark pointer"></i>'
        html.appendChild(button);
        return html;
    }
}


class Popup {

    constructor(data) {
        this.xmark = new PopupXmark(data);
        this.title = new PopupTitle(data);
        this.content = new PopupContent(data);
        this.html = this.build();
    }

    build() {
        let html = document.createElement("div");
        html.className = "popup";
        html.appendChild(this.xmark.html);
        html.appendChild(this.title.html);
        html.appendChild(this.content.html);
        return html;
    }
}


class PopupContainer {

    constructor(data) {
        this.name = CardTitle.formatTitle(data.title);
        this.popup = new Popup(data);
        this.html = this.build();
    }

    build() {
        let html = document.createElement('div');
        html.id = `${this.name}Popup`;
        html.className = "popup-container hidden"
        html.appendChild(this.popup.html);
        return html;
    }

    inject() {
        document.querySelector("body").appendChild(this.html);
    }

    static blurBackground() {
        let background = document.querySelector("#main")
        background.classList.toggle("blur")
        document.querySelector("body").classList.toggle("no-scroll")
    }

    static togglePopup(project) {
        PopupContainer.blurBackground()
        let popup = document.querySelector(`#${project}Popup`)
        popup.classList.toggle("hidden")
    }
}
