class Data {

    static async getDatas() {
        let datas = await fetch("../datas/projects.json")
            .then((response) => response.json())
            .then((data) => data.projects)
            .catch((error) => console.error(error))
        return datas
    }
}

class CardTitle {

    constructor(data) {
        this.rawTitle = data.title;
        this.html = this.build();
    }

    static formatTitle(title) {
        let regex = /[^a-z]/g;
        let formatedTitle = title.toLowerCase().replace(regex, "");
        return formatedTitle;
    }

    build() {
        let title = this.rawTitle[0].toUpperCase() + this.rawTitle.substring(1);
        let html = document.createElement("h3");
        html.setAttribute("class", "card-title");
        html.innerHTML = title;
        return html
    }
}


class CardDescription {

    constructor(data) {
        this.rawDescription = data.description;
        this.html = this.build();
    }

    build() {
        let description = this.rawDescription[0].toUpperCase() + this.rawDescription.substring(1);
        let html = document.createElement("p");
        html.setAttribute("class", "card-description");
        html.innerHTML = description;
        return html
    }
}


class CardButton {

    constructor(data) {
        this.title = CardTitle.formatTitle(data.title);
        this.html = this.build()
    }

    build() {
        let html = document.createElement('div');
        html.setAttribute("class", "card-actions");

        let button = document.createElement('button');
        button.setAttribute("class", "css-button-arrow--black");
        button.setAttribute("onclick", `PopupContainer.togglePopup("${this.title}")`)
        button.innerHTML = "En savoir plus";

        html.appendChild(button);
        return html
    }
}


class CardContent {

    constructor(data) {
        this.title = new CardTitle(data);
        this.description = new CardDescription(data);
        this.button = new CardButton(data);
        this.html = this.build()
    }

    build() {
        let html = document.createElement('div');
        html.setAttribute("class", "card-content");

        html.appendChild(this.title.html)
        html.appendChild(this.description.html)
        html.appendChild(this.button.html)
        return html
    }
}


class CardImage {

    constructor(data) {
        this.title = CardTitle.formatTitle(data.title);
        this.html = this.build();
        this.loaded = false;
    }

    build() {
        let html = document.createElement('div');
        html.setAttribute("class", "card-image-container");
        html.id = `${this.title}-img-container`

        let image = document.createElement('img');
        image.id = `${this.title}Preview`;
        image.setAttribute("class", "card-image");
        image.src = `medias/projects_previews/${this.title}PreviewSingle.png`
        image.alt = this.title + " preview";

        html.appendChild(image)
        return html;
    }


    static toGif(project) {
        let src = `medias/projects_previews/${project}_preview.gif`
        let image = document.querySelector(`#${project}Preview`);
        image.setAttribute('src', src)

        let container = document.querySelector(`#${project}-img-container`)
        let spiner = document.createElement('div')
        spiner.setAttribute("class", "lds-ellipsis");
        for (let i = 0; i < 4; i++) {
            let div = document.createElement('div')
            spiner.appendChild(div)
        }
        container.prepend(spiner)
        image.addEventListener('load', () => {
            spiner.remove();
        });
    }

    static toPng(project) {
        let src = `medias/projects_previews/${project}PreviewSingle.png`
        document.querySelector(`#${project}Preview`).setAttribute('src', src)
    }
}


class Card {

    constructor(data) {
        this.title = CardTitle.formatTitle(data.title);
        this.image = new CardImage(data);
        this.content = new CardContent(data);
        this.html = this.build();
    };

    build() {
        let html = document.createElement("div");
        html.className = "card";
        html.setAttribute("onmouseover", `CardImage.toGif("${this.title}")`)
        html.setAttribute("onmouseout", `CardImage.toPng("${this.title}")`)

        html.appendChild(this.image.html);
        html.appendChild(this.content.html);
        return html
    }

    inject() {
        let container = document.querySelector(".cards-container");
        container.appendChild(this.html);
    }
}


// MAIN
async function createProjects() {
    let datas = await Data.getDatas()
    datas.forEach(project => {
        let card = new Card(project);
        card.inject();

        let popup = new PopupContainer(project);
        popup.inject();
    });
}
