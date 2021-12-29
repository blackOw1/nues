import * as model from './model';
import headerView from './views/headerView';
import sideNavView from './views/sideNavView';
import searchHeaderView from './views/searchHeaderView';
import backdropView from './views/backdropView';
import footerView from './views/footerView';
import contentView from './views/contentView';
import loadMoreView from './views/loadMoreView';

// Parcel reload on save
if (module.hot) module.hot.accept(() => { location.reload(); });

const controlSidenav = function() {
    sideNavView._toggleSidenav(model.toggleSidenav());
    backdropView._renderBackdrop();
};

const controlTheme = function() {
    model.toggleTheme();
    headerView._setTheme(model.state.theme);
};

const controlCopyright = function() {
    return model.copyright();
}

const controlNews = async function() {
    const id = document.querySelector('body').id;
    
    
    try {
        contentView.renderSpinner(contentView._contentContainerElement);
        await model.init();
        contentView._removeSpinner();
        contentView._render(model.state.pages, model.state.search);
        
        if (id === 'search') {
            searchHeaderView._activateFocus();
            searchHeaderView._renderHeading(model.state.search.queries);
        }
        
        // Load load more button
        loadMoreView._initBtn(id, id === 'search' ? model.state.search.queries : model.state.pages);
    } catch(err) {
        console.log(err);
        contentView._renderError(err);
    }
};

const controlLoadMore = async function() {    
    // Disable the btn
    loadMoreView._disableBtn();
    
    // Load more news
    await model.loadMoreResults();

    // Remove btn from the container
    loadMoreView._clear(loadMoreView._parentElement);
    
    // Render new btn
    loadMoreView._renderBtn();

    // Render news 
    contentView._renderMore(model.state.pages, model.state.search);
    console.log(model.state);
};

const init = function() {
    model.loadStorage();
    headerView._setTheme(model.state.theme);
    footerView._renderCopyright(controlCopyright);
    headerView._addHandlerMenu(controlSidenav);
    sideNavView._addHandlerClose(controlSidenav);
    backdropView._addHandlerBackdrop(controlSidenav);
    headerView._addHandlerClick(controlTheme);
    contentView._addHandlerRender(controlNews);
    loadMoreView._addHandlerClick(controlLoadMore);
};

init();