class Searchbar {
    _parentElement = document.querySelector('.search-box');
    _backBtn = this._parentElement.querySelector('.search-back');
    _input = this._parentElement.querySelector('.search-input');

    _addHandlerBack(handler) {
        this._backBtn.addEventListener('click', function() {
            handler();
        });
    }

    _toggleSearch() {
        this._parentElement.classList.toggle('search-box-active');
        this._input.focus();
    }
}

// export default new Searchbar();