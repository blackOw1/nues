class SearchHeaderView {
    _parentElement = document.querySelector('.search-header');
    _heading = this._parentElement?.querySelector('.subheading');
    _input = this._parentElement?.querySelector('.form__input');
    _pageId = document.querySelector('body').id;

    _activateFocus() {
        const q = this._getQuery();

        if (!q) this._input.focus();
    }

    _renderHeading(queries) {
        const q = this._getQuery();

        if (!q) {
            this._heading.innerText = 'What will you search for today?';
        }
        
        if (q) {
            const hits = queries[q].totalHits;
            this._heading.innerText = `${hits} ${hits === 1 ? 'result' : 'results'} found`;
        }
    }

    _renderError(err) {
        const q = err.user_input.q;
        this._heading.innerText = `No results were found for "${q}"`;
    }

    _getQuery() {
        return new URLSearchParams(window.location.search).get('q');
    }
}

export default new SearchHeaderView();