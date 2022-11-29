class FooterView {
    _parentElement = document.querySelector('.footer');

    _renderCopyright(year) {
        const text = `&copy; ${year()} nues`;
        this._parentElement.querySelector('.footer-copyright').innerHTML = text;
    }
}

export default new FooterView();