class HeaderView {
    _parentElement = document.querySelector('.header');
    _menuBtn = this._parentElement.querySelector('.menu');
    _searchBtn = this._parentElement.querySelector('.search');
    _backSearchBtn = this._parentElement.querySelector('.search-back');
    _themeBtn = this._parentElement.querySelector('.theme');
    _navLinks = this._parentElement.querySelector('.nav');

    _addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btnTheme = e.target.closest('.theme');
            if (!btnTheme) return;
            handler();
        });
    }

    _addHandlerMenu(handler) {
        this._menuBtn.addEventListener('click', function() {
            handler();
        });
    }

    _addHandlerSearch(handler) {
        this._searchBtn.addEventListener('click', function() {
            handler();
        });
    }

    _setTheme(theme) {
        const prevTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
    }

    _toggleHeaderContent() {
        this._menuBtn.classList.toggle('hidden');
        this._searchBtn.classList.toggle('hidden');
        this._themeBtn.classList.toggle('hidden');
        this._navLinks.classList.toggle('hidden');
    }
}

export default new HeaderView();