(function iife() {
  // 'use strict';

  const projectCardsWithInnerText = [].slice
    .call(document.querySelectorAll('.project--card'), 0)
    .map(cardEl => ({
      cardEl,
      cardInnerText: getAllInnerText(cardEl),
    }));

  const filterInput = document.querySelector('#filter');
  const quickFilters = document.querySelector('.quick-filters');
  const projectsContainer = document.querySelector('.projects-container');

  const filters = getParameterByName('filters')
    ? getParameterByName('filters').split(',')
    : [];

  let searchTerm = getParameterByName('searchTerm') || '';
  filterInput.value = searchTerm;

  assignFilterClasses();
  assignSelectedClassToFilterItems();

  filterInput.addEventListener('input', debounce(enteredSearchTerm, 300));
  quickFilters.addEventListener('click', clickedFilterTerm);

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
    updateQueryParams(filters, searchTerm);
  }

  function clickedFilterTerm({ target }) {
    if (target.tagName === 'LI') {
      const filterText = target.innerText;
      const filterIndex = filters.findIndex(text => text === filterText);

      if (filterIndex > -1) {
        filters.splice(filterIndex, 1);
      } else {
        filters.push(filterText);
      }

      assignFilterClasses();
      updateQueryParams();
      assignSelectedClassToFilterItems();
    }
  }

  function assignSelectedClassToFilterItems() {
    quickFilters
      .querySelectorAll('li')
      .forEach((filterItem) => {
        const findFn = filterText =>
          filterItem.innerText === filterText;

        const method = filters.find(findFn) ? 'add' : 'remove';

        filterItem.classList[method]('selected');
      });
  }

  function assignFilterClasses() {
    const shownCards = projectCardsWithInnerText
      .filter(assignFilteredOutClass);

    const method = shownCards.length === 0 ? 'add' : 'remove';

    projectsContainer.classList[method]('no-cards-shown');
  }

  function assignFilteredOutClass({ cardEl, cardInnerText }) {
    const searchRegex = new RegExp([
      filters.join('|'),
      searchTerm,
    ].filter(str => !!str).join('|'), 'gi');

    const show = (filters.length === 0 && searchTerm === '') ||
      searchRegex.test(cardInnerText);

    const method = show ? 'remove' : 'add';

    cardEl.classList[method]('filtered-out');

    return show;
  }

  function updateQueryParams() {
    const newState = [
      // "quick-filters" selected items
      filters.length ? `filters=${filters.join(',')}` : '',
      // "prefilled-search" text-input
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
