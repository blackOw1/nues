import View from "./View";
import cardView from "./cardView";

class ContentView extends View {
    _parentElement = document.querySelector('body');
    _mainElement = document.querySelector('.main').querySelector('.list');
    _containerElement = document.querySelector('.container')?.querySelector('.list');
    _contentContainerElement = document.querySelector('.content-container');
    _mainHeading = this._parentElement.querySelector('.main__heading');

    _removeSpinner() {
        const spinner = this._contentContainerElement.querySelector('.spinner');
        spinner.remove();
    }

    _render(pages, search) {
        const id = this._parentElement.id;
        let markup;
        let markupMain;

        if (id === 'search') {
            const q = new URLSearchParams(window.location.search).get('q');
            if (!q) return;

            this._data = search.queries[q]?.results.filter(d => d.source !== 'reddit.com');

            markupMain = this._data.map(content => cardView._render(content)).join('');
        } else {
            this._data = pages[id]?.results.filter(d => d.source !== 'reddit.com');
            if (!this._data) return;
            markupMain = this._data.slice(0, 3).map((content, i) => cardView._render(content, i)).join('');
            markup = this._data.slice(3).map(content => cardView._render(content)).join('');

            this._containerElement.insertAdjacentHTML('afterbegin', markup);
        }

        // this._clear(this._mainElement);

        this._mainElement.insertAdjacentHTML('afterbegin', markupMain);
        if (this._mainHeading) this._mainElement.parentElement.insertAdjacentElement('afterbegin', this._mainHeading);

        this._cards = document.querySelectorAll('.card');
    }

    _renderMore(pages, search) {
        const id = this._parentElement.id;
        let markup;

        if (id === 'search') {
            const q = new URLSearchParams(window.location.search).get('q');
            this._data = search.queries[q].results.filter(d => d.source !== 'reddit.com');
            markup = this._renderMarkup();
            this._mainElement.insertAdjacentHTML('beforeend', markup);
        } else {
            this._data = pages[id].results.filter(d => d.source !== 'reddit.com');
            markup = this._renderMarkup();
            this._containerElement.insertAdjacentHTML('beforeend', markup);
        }
    }

    _renderMarkup() {
        return this._data.map(content => cardView._render(content)).join('');
    }

    _renderBGImage() {
        console.log(this._cards);
        this._cards.forEach((card, i) => card.style.backgroundImage = `url("${this._data[i].image}")`);
    }

    _renderError(err) {
        const { message, status } = err;
        const id = this._parentElement.id;

        this._removeSpinner();
    }
}

export default new ContentView();