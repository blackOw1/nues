import View from "./View";

class CardView extends View {
    _parentElement;

    _generateMarkup(num) {
        return `
                <li class="card ${num < 3 ? `card-article-${num + 1}` : ''}">
                    <a class="card-link" href="${this._data.sourceUrl}" target="_blank" rel="noopener noreferrer" aria-label="${this._data.title}">
                        <div class="card__img-container">
                            <img class="card__img" src="${this._data.image}" alt="IMAGE"></img>
                        </div>
                        <div class="card__description">
                            <span class="card__description-source-container">
                                <span class="card__description-source">${this._data.source}</span>
                            </span>
                            <h3 class="card__heading">${this._data.title}</h3>
                            <span class="card__date">${this._data.publicationDate}</span>
                        </div>
                    </a>
                </li>
        `;
    }
}

export default new CardView();