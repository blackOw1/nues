class BackdropView {
    _parentElement = document.querySelector('.backdrop');

    _addHandlerBackdrop(handler) {
        this._parentElement.addEventListener('click', function() {
            handler();
        });
    }

    _renderBackdrop() {
        this._parentElement.classList.toggle('backdrop-visible');
    }
}

export default new BackdropView();