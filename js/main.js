
/**
 * Coded by: Gerardo Ortiz
 * Created on: 12/15/2019
 * Last edited: 1/22/2020
 */

////////////////////////////////////////////////////////////////

/* icons */

// hamburger icon

var hamburgerIcon = document.querySelectorAll('.header__menu');

// navbar icons

var bookmark = document.querySelectorAll('.bookmark');
var close = document.querySelectorAll('.close');
var like = document.querySelectorAll('.like');

/* buttons */

var btn = document.querySelector('.start__btn');
var toggleSwitch = document.querySelector('.toggle-switch');
var toggleSwitchTrack = document.querySelector('.toggle-switch__track');
var toggleSwitchThumb = document.querySelector('.toggle-switch__thumb');

/* pages */

var main = document.querySelector('.start');
var sideNav = document.querySelector('.drawer');
var home = document.querySelector('.home');
var saved = document.querySelector('.saved');
var settings = document.querySelector('.settings');
var article = document.querySelectorAll('.article');
var transparentPanel = document.querySelector('.transparent-panel');

/* cards */

var cards = document.querySelectorAll('.card');

/* list */

var links = document.querySelectorAll('.list__item--link');
var listItem = document.querySelectorAll('.list__item');

/* active li link highlighter */

var selected = document.querySelector('.selected');

/* other */

var articleHeading = document.querySelectorAll('.article-content__heading');

// used to store the value retrieved from the attribute 'data-article-number' 
var num;

// empty variable used to clone an element when saving content to the saved page section
var clone;

// unique id attached to the div element that has the class 'saved' 
var savedSectionContainer = document.querySelector('#saved-articles');

// database which stores the cloned elements and its children 
var cloneDB = [];

// container that contains text when no articles are present 
var placeholderText = document.querySelector('.placeholder');

// value of the current theme 
var themeValue = document.documentElement.getAttribute('data-theme');

////////////////////////////////////////////////////////////////


// takes you to the Home page

btn.addEventListener('click', shiftContentToTheLeft);

function shiftContentToTheLeft() {
    sideNav.classList.add('shift-x');
    home.classList.add('shift-x');
    saved.classList.add('shift-x');
    settings.classList.add('shift-x');
    transparentPanel.classList.add('shift-x');
}

// displays the side drawer

hamburgerIcon.forEach(icon => {
    icon.addEventListener('click', activateDrawer);
})

// triggers the drawer

function activateDrawer() {
    showDrawer(home);
    showDrawer(saved);
    showDrawer(settings);
    showDrawer(transparentPanel);
    disablePages(transparentPanel);
}

function showDrawer(drawer) {
    drawer.classList.add('drawer-activated');
}

function hideDrawer(drawer) {
    drawer.classList.remove('drawer-activated');
}

// closes the drawer when the transparent panel is clicked

transparentPanel.addEventListener('click', function() {
    hideDrawer(home);
    hideDrawer(saved);
    hideDrawer(settings);
    hideDrawer(transparentPanel);
    disablePages(transparentPanel);
});

/* transparent panel */

function disablePages(disable) {
    // disables interaction with the elements in an active page while the drawer is present
    disable.classList.toggle('z-mod-panel');
}

/* drawer links */

links.forEach(linkSelection => {

    linkSelection.addEventListener('click', function() {

        if (linkSelection.textContent.includes('Home')) {
            resetZIndex();
            home.classList.add('z-mod');
            hideDrawer(home);
            hideDrawer(saved);
            hideDrawer(settings);
            hideDrawer(transparentPanel);
            disablePages(transparentPanel);

            // adds the class 'selected' to the 'li' element when the 'a' element is clicked
            listItem[0].appendChild(selected);

        } else if (linkSelection.textContent.includes('Saved')) {
            resetZIndex();
            saved.classList.add('z-mod');
            hideDrawer(saved);
            hideDrawer(home);
            hideDrawer(settings);
            hideDrawer(transparentPanel);
            disablePages(transparentPanel);

            // adds the class 'selected' to the 'li' element when the 'a' element is clicked
            listItem[1].appendChild(selected);

        } else if (linkSelection.textContent.includes('Settings')) {
            resetZIndex();
            settings.classList.add('z-mod');
            hideDrawer(settings);
            hideDrawer(home);
            hideDrawer(saved);
            hideDrawer(transparentPanel);
            disablePages(transparentPanel);

            // adds the class 'selected' to the 'li' element when the 'a' element is clicked
            listItem[2].appendChild(selected);
        }
    });
    
});

// resets the z-index of the pages

function resetZIndex() {
    if (home.classList.contains('z-mod')) {
        home.classList.remove('z-mod');
    } else if (saved.classList.contains('z-mod')) {
        saved.classList.remove('z-mod');
    } else if (settings.classList.contains('z-mod')) {
        settings.classList.remove('z-mod');
    }
}

// loads an article relative to the selected card container

function loadArticle(load) {
    num = load.getAttribute('data-article-number');
    num -= 1;
    article[num].classList.add('shift-y');
}

/* nav bar */

// closes the article

for (var cn = 0; cn < close.length; cn++) {
    close[cn].addEventListener('click', function() {
        article[num].classList.remove('shift-y');
    });
}

// adds a like the article

for (var l = 0; l < like.length; l++) {
    like[l].addEventListener('click', function() {
        toggleNavIcon(like[num], 'liked')
    });
}

function toggleNavIcon(el, selector) {
    if (themeValue == 'dark') {
        el.classList.toggle(selector + '-alt');
        el.classList.remove(selector);
    } else {
        el.classList.toggle(selector);
        el.classList.remove(selector + '-alt');
    }
}

// bookmarks the article

for (var b = 0; b < bookmark.length; b++) {
    bookmark[b].addEventListener('click', function() {
        toggleNavIcon(bookmark[num], 'bookmarked');

        if (bookmark[num].classList.contains('bookmarked') || bookmark[num].classList.contains('bookmarked-alt')) {
            saveArticle();
        } else {
            deleteArticle();
        }
        hidePlaceholderText();
    });
}

function changeNavIcons(el, value) {
    for (var ni = 0; ni < el.length; ni++) {
        if (el[ni].classList.contains(value)) {
            el[ni].classList.remove(value);
            el[ni].classList.add(value + '-alt');
        } else if (el[ni].classList.contains(value + '-alt')) {
            el[ni].classList.remove(value + 'alt');
            el[ni].classList.add(value);
        }
    }
}

function switchToDarkModeIcons(el, value) {
    for (var ni = 0; ni < el.length; ni++) {
        if (el[ni].classList.contains(value)) {
            el[ni].classList.remove(value);
            el[ni].classList.add(value + '-alt');
        }
    }
}

function switchToDefaultIcons(el, value) {
    for (var ni = 0; ni < el.length; ni++) {
        if (el[ni].classList.contains(value + '-alt')) {
            el[ni].classList.remove(value + '-alt');
            el[ni].classList.add(value);
        }
    }
}

function saveArticle() {
    // clones the element
    clone = cards[num].cloneNode(true);
    // adds the clone to the array called cloneDB
    cloneDB.push(clone);
    var lastItem = cloneDB.length - 1;
    var write = savedSectionContainer.appendChild(cloneDB[lastItem]);
    write.setAttribute('onclick', 'loadArticle(this)');
}

function deleteArticle() {
    //
    for (var del = 0; del < cloneDB.length; del++) {
        //
        var cloneAttr = cloneDB[del].getAttribute('data-article-number');
        var articleAttr = article[num].getAttribute('data-article-number');
        if (cloneAttr == articleAttr) {
            // removes the element from the 
            savedSectionContainer.removeChild(cloneDB[del]);
            // removes the targetted item from the array
            cloneDB.splice(del, 1);
        }
    }
}

function hidePlaceholderText() {
    cloneDB.length !== 0 ? placeholderText.classList.add('hidden') : placeholderText.classList.remove('hidden')
}

/* toggle switch */

toggleSwitch.addEventListener('click', function() {
    toggleSwitchThumb.classList.toggle('on');
    setTheme();
});

/* dark mode theme */

function setTheme() {
    if (toggleSwitchThumb.classList.contains('on')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeValue = document.documentElement.getAttribute('data-theme');
        setDarkModeIcons();
    } else {
        document.documentElement.setAttribute('data-theme', 'default');
        themeValue = document.documentElement.getAttribute('data-theme');
        setDefaultIcons();
    }
}

function setDarkModeIcons() {
    changeHamburgerIcon(hamburgerIcon, 'header__menu-alt');
    switchToDarkModeIcons(like, 'liked');
    switchToDarkModeIcons(bookmark, 'bookmarked');
}

function setDefaultIcons() {
    changeHamburgerIcon(hamburgerIcon, 'header__menu-alt');
    switchToDefaultIcons(like, 'liked');
    switchToDefaultIcons(bookmark, 'bookmarked');
}

function changeHamburgerIcon(icon, selector) {
    for (var ci = 0; ci < icon.length; ci++) {
        if (icon[ci].classList.contains(selector)) {
            icon[ci].classList.remove(selector);
        } else {
            icon[ci].classList.add(selector);
        }
    }
}
