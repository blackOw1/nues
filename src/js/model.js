import { API_URL } from "./config";
import { fetchNews } from "./helpers";

export const state = {
    pages: {},
    search: {
        queries: {}
    },
    sidenav: {
        isActive: false
    },
    theme: 'light'
};

const createNewsObject = function(data) {
    const { articles } = data;

    return articles.map(article => {
        return {
            id: article._id,
            title: article.title,
            source: article.clean_url,
            sourceUrl: article.link,
            image: article.media,
            publicationDate: convertDate(article.published_date),
            rights: article.rights,
            summary: article.summary,
            topic: article.topic,
            author: article.author ?? 'No author',
            authors: article.authors?.length ? article.authors : 'No authors'
        }
    });
};

export const loadNews = async function(query, pageId) {
    let page;
    let obj;

    if (pageId === 'search') page = state.search.queries[query]?.page ?? 1;
    else page = state.pages[query]?.page ?? 1;

    try {
        const data = await fetchNews(`${API_URL}`, query, page);
        // const data = await AJAX(`${API_URL}?q=${query}&lang=en&page=${page}`, API_HOST, API_KEY);

        if (data.status !== 'ok') throw data;
        
        obj = {
            query: query,
            totalPages: data.total_pages,
            totalHits: data.total_hits,
            results: createNewsObject(data),
            lastAccess: getCurrentTime(),
            page: page,
            _d: data
        };

        if (pageId === 'search') {
            state.search.queries[query] = obj;
        } else {
            state.pages[query] = {
                totalPages: data.total_pages,
                results: obj.results,
                lastAccess: obj.lastAccess,
                page: page,
                _d: data
            };
        }

        // Store news on storage device
        setLocalStorage();
    } catch(err) {
        if (pageId === 'search') console.error(`💥 No matches were found for "${err.user_input.q}" 💥`);
        throw err;
    }
};

export const loadMoreResults = async function() {
    const pageId = document.querySelector('body').id;
    let query;
    let page;

    if (pageId === 'search') {
        query = new URLSearchParams(window.location.search).get('q');
        state.search.queries[query].page += 1;
        page = state.search.queries[query].page;
    } else {
        query = pageId;
        state.pages[pageId].page += 1;
        page = state.pages[pageId].page;
    }

    try {
        const data = await fetchNews(`${API_URL}`, query, page);
        const obj = createNewsObject(data);

        if (pageId === 'search') {
            state.search.queries[query].results = obj;
        } else {
            state.pages[pageId].results = obj;
        }
    } catch(err) {
        console.log(err);
    }
};

const convertDate = function(date) {
    const months = new Map([
        ['01', 'January'],
        ['02', 'February'],
        ['03', 'March'],
        ['04', 'April'],
        ['05', 'May'],
        ['06', 'June'],
        ['07', 'July'],
        ['08', 'August'],
        ['09', 'September'],
        ['10', 'October'],
        ['11', 'November'],
        ['12', 'December']
    ]);
    const [year, month, day] = date.split(' ')[0].split('-');
    
    return `${months.get(month)} ${day}, ${year}`;
};

export const toggleSidenav = function() {
    state.sidenav.isActive ? state.sidenav.isActive = false : state.sidenav.isActive = false;
};

export const toggleSearch = function() {
    state.search.isActive ? state.search.isActive = false : state.search.isActive = false;
};

export const toggleTheme = function() {
    state.theme === 'light' ? state.theme = 'dark' : state.theme = 'light';

    // Save state
    setLocalStorage();

    return state.theme;
};

export const copyright = function() {
    return new Date().getFullYear();
};

const getCurrentTime = () => new Date().getTime();

const getMinutes = function(time) {
    const minute = 1000 * 60;
    // get current time
    const currTime = getCurrentTime();

    return (currTime - time) / minute;
};

const setLocalStorage = function() {
    localStorage.setItem('data', JSON.stringify(state));
};

const getLocalStorage = function(query) {
    return localStorage.getItem(query);
};

const loadCache = function(cache, pageId) {
    const time = getMinutes(cache?.lastAccess);
    // console.log('LAST ACCESSED (MINUTES):', time);

    if (time < 30) {
        // load cached content
        return new Promise(res => res(cache));
    }

    return null;
};

const updateState = function(cache) {
    state.categories = cache.categories;
    state.pages = cache.pages;
    state.search = cache.search;
    state.sidenav = cache.sidenav;
    state.theme = cache.theme;
};

export const loadStorage = function() {
    const storage = JSON.parse(getLocalStorage('data'));

    // Update state
    if (storage) updateState(storage);
};

export const init = async function() {
    try {
        const storage = JSON.parse(getLocalStorage('data'));
        const pageId = document.querySelector('body').id;
        
        // Update state
        // if (storage) updateState(storage);
        
        if (pageId === 'search') {
            // get URL query
            const query = new URLSearchParams(window.location.search).get('q');
    
            if (!query) {
                console.log('No query found in the URL');
                return;
            }
    
            const cache = storage?.search.queries;
    
            if (cache && Object.keys(cache).includes(query)) {
                state.search.queries[query] = await loadCache(cache[query]);
            }
    
            if (!state.search.queries[query]) {
                await loadNews(query, pageId);
            }
        };
    
        if (pageId !== 'search') {
            const cache = storage?.pages;
    
            if (cache && Object.keys(cache).includes(pageId)) {
                state.pages[pageId] = await loadCache(cache[pageId]);
            }
            
            if (!state.pages[pageId]) {
                console.log('The current page does not have the specified cached content or the content has expired');
                await loadNews(pageId, null);
                // await new Promise(res => res(loadNews(pageId, null)));
            }
        }
    } catch(err) {
        throw err;
    }
};
