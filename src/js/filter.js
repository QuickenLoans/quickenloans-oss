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

  function clickedFilterTerm(e) {
    if (e.target.tagName !== 'LI') return;

    const filterText = e.target.innerText;
    const filterIndex = filters.findIndex(text => text === filterText);

    if (filterIndex > -1) {
      filters.splice(filterIndex, 1);
    } else {
      filters.push(filterText);
    }

    assignFilterClasses();
    updateQueryParams(filters, searchTerm);
    assignSelectedClassToFilterItems();
  }

  function assignSelectedClassToFilterItems() {
    const filterItems = quickFilters.querySelectorAll('li');
    filterItems.forEach((filterItem) => {
      const findFn = filterText =>
        filterItem.innerText === filterText;

      const method = filters.find(findFn)
        ? 'add'
        : 'remove';

      filterItem.classList[method]('selected');
    });
  }

  function assignFilterClasses() {
    const shownCards = projectCardsWithInnerText
      .filter(assignFilteredOutClass);

    const method = shownCards.length === 0
      ? 'add'
      : 'remove';

    projectsContainer.classList[method]('no-cards-shown');
  }

  function assignFilteredOutClass({ cardEl, cardInnerText }) {
    const searchRegex = new RegExp(
      filters.map(text => text).join('|')
      + ((filters.length > 0 && searchTerm !== '' && '|') || '')
      + searchTerm
      , 'gi');

    const show = searchRegex.test(cardInnerText) ||
      (filters.length === 0 && searchTerm === '');

    cardEl.classList[show ? 'remove' : 'add']('filtered-out');

    return show;
  }

  function updateQueryParams(strings, terms) {
    const filtersParam = strings.length ? `filters=${strings.join(',')}` : '';
    const searchTermParam = terms ? `searchTerm=${terms}` : '';

    history
      .replaceState({}, '', `?${[filtersParam, searchTermParam].join('&')}`);
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;

    name = name.replace(/[[\]]/g, '\\$&');

    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`, 'i');
    const results = regex.exec(url);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}());
