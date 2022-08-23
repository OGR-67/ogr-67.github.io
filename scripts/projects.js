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

    static formatTitle(title) {
        let regex = /[^a-z]/g;
        let formatedTitle = title.toLowerCase().replace(regex, "");
        return formatedTitle;
    }

    static create(project) {
        let title = project.title[0].toUpperCase() + project.title.substring(1);
        let html = `<h3 class="card-title">${title}</h3>`
        return html
    }
}


class CardDescription {

    static create(project) {
        let description = project.description[0].toUpperCase() + project.description.substring(1);
        let html = `<p class="card-description">${description}</p>`
        return html
    }
}


class CardButton {

    static create(project) {
        let id = CardTitle.formatTitle(project.title);
        let html = `<div class="card-actions">\n\t<button onclick="togglePopup('${id}')" class="css-button-arrow--black">En savoir plus</button>\n</div>`;
        return html;
    }
}


class CardContent {

    static create(project) {
        let title = CardTitle.create(project);
        let description = CardDescription.create(project);
        let button = CardButton.create(project);

        let html = `<div class="card-content">\n\t${title}\n\t${description}\n\t${button}\n</div>`
        return html
    }
}


class CardImage {

    static create(project) {
        let name = CardTitle.formatTitle(project.title);
        let html = `<img id="${name}Preview" class="card-image" src="medias/projects_previews/${name}PreviewSingle.png" alt="${name} preview">`
        return html
    }

    static loadGif(project) {
        document.querySelector(`#${project}Preview`).setAttribute('src', `medias/projects_previews/${project}_preview.gif`)
    }

    static loadPng(project) {
        document.querySelector(`#${project}Preview`).setAttribute('src', `medias/projects_previews/${project}PreviewSingle.png`)
    }
}


class CardBuild {

    constructor(project) {
        this.project = CardTitle.formatTitle(project.title);
        this.image = CardImage.create(project);
        this.content = CardContent.create(project);
    };

    build() {
        let html = `<div class="card" onmouseover="CardImage.loadGif('${this.project}')" onmouseout="CardImage.loadPng('${this.project}')">\n\t${this.image}\n\t${this.content}\n</div>`
        return html
    }
}


class HTMLUpdate {

    static update(build, selector) {
        let node = document.querySelector(`.${selector}`)
        node.innerHTML += build
    }
}

// MAIN
async function createProjectsCards() {
    let datas = await Data.getDatas()
    datas.forEach(project => {
        let cardBuild = new CardBuild(project);
        HTMLUpdate.update(cardBuild.build(), "cards-container")
    });
}