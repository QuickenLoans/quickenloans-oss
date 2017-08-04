(function iife() {
  // 'use strict';

  const projectCardsWithInnerText = [].slice
    .call(document.querySelectorAll('.c-ProjectCard'), 0)
    .map(cardEl => ({
      cardEl,
      cardInnerText: getAllInnerText(cardEl),
    }));

  const filterInput = document.querySelector('#filter');
  const projectsContainer = document.querySelector('.o-ProjectGrid');

  let searchTerm = getParameterByName('searchTerm') || '';
  filterInput.value = searchTerm;

  assignFilterClasses();

  filterInput.addEventListener('input', debounce(enteredSearchTerm, 300));

  function debounce(func, wait, immediate) {
    let timeout;

    function bounce(...args) {
      const context = this;

      function later() {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      }

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);

      if (callNow) {
        func.apply(context, args);
      }
    }

    return bounce;
  }

  function getAllInnerText(el) {
    const walker = document
      .createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

    let n = walker.nextNode();
    const ary = [];

    while (n) {
      ary.push(n.textContent);
      n = walker.nextNode();
    }

    return ary.join(' ').replace(/\s\s+/g, ' ');
  }

  function enteredSearchTerm(e) {
    searchTerm = e.target.value;
    assignFilterClasses();
    updateQueryParams(searchTerm);
  }

  function assignFilterClasses() {
    const shownCards = projectCardsWithInnerText
      .filter(assignFilteredOutClass);

    const method = shownCards.length === 0 ? 'add' : 'remove';

    projectsContainer.classList[method]('js-NoCards');
  }

  function assignFilteredOutClass({ cardEl, cardInnerText }) {
    const searchRegex = new RegExp([
      searchTerm,
    ].filter(str => !!str).join('|'), 'gi');

    const show = (searchTerm === '') ||
      searchRegex.test(cardInnerText);

    const method = show ? 'remove' : 'add';

    cardEl.classList[method]('js-Filtered');

    return show;
  }

  function updateQueryParams() {
    const newState = [
      // "filter-list" text-input
      searchTerm ? `searchTerm=${searchTerm}` : '',
    ].filter(str => !!str).join('&');

    history.replaceState({}, '', `?${newState}`);
  }

  function getParameterByName(name, url) {
    name = name.replace(/[[\]]/g, '\\$&');

    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`, 'i');
    const results = regex.exec(url || window.location.href);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}());
