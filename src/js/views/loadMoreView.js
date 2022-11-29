import View from "./View";

class LoadMoreView extends View {
    _parentElement = document.querySelector('.load-more');

    _addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.load-more__btn');

            if (!btn) return;

            handler();
        });
    }

    _generateMarkup() {
        return `
        <button class="load-more__btn">Load more</button>
        `;
    }

    _initBtn(id, data) {
        const query = id === 'search' ? new URLSearchParams(window.location.search).get('q') : id;
        
        if (data[query]?.totalPages > data[query]?.page) {
            this._renderBtn();
        }
    }

    _renderBtn() {
        this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
    }

    _disableBtn() {
        const btn = this._parentElement.querySelector('.load-more__btn');
        btn.disabled = true;
        btn.classList.add('disabled');
    }
}

export default new LoadMoreView();