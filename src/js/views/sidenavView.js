class SidenavView {
    _parentElement = document.querySelector('.sidenav');
    _closeBtn = this._parentElement.querySelector('.close');

    _addHandlerClose(handler) {
        this._closeBtn.addEventListener('click', function() {
            handler();
        });
    }

    _toggleSidenav() {
        this._parentElement.classList.toggle('sidenav-visible');
    }
}

export default new SidenavView();