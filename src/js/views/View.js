import icons from 'url:../../img/icons.svg';

export default class View {
    _parentElement;
    _data;
    _customClass;

    _addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _render(data, index) {
        this._data = data;
        const markup = this._generateMarkup(index);
        return markup;
    }

    renderSpinner(target) {
        const markup = `
            <div class="icon spinner">
                <svg>
                    <use href="${icons}#loader"></use>
                </svg>
            </div>
        `;
      
        // this._clear();
        target.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage() {}

    _clear(el) {
        el.innerHTML = '';
    }
}