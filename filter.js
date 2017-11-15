'use strict';

(function iife() {
  // 'use strict';

  var projectCardsWithInnerText = [].slice.call(document.querySelectorAll('.c-ProjectCard'), 0).map(function (cardEl) {
    return {
      cardEl: cardEl,
      cardInnerText: getAllInnerText(cardEl)
    };
  });

  var filterInput = document.querySelector('#filter');
  var projectsContainer = document.querySelector('.o-ProjectGrid');

  var searchTerm = getParameterByName('searchTerm') || '';
  filterInput.value = searchTerm;

  assignFilterClasses();

  filterInput.addEventListener('input', debounce(enteredSearchTerm, 300));

  function debounce(func, wait, immediate) {
    var timeout = void 0;

    function bounce() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var context = this;

      function later() {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      }

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);

      if (callNow) {
        func.apply(context, args);
      }
    }

    return bounce;
  }

  function getAllInnerText(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

    var n = walker.nextNode();
    var ary = [];

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
    var shownCards = projectCardsWithInnerText.filter(assignFilteredOutClass);

    var method = shownCards.length === 0 ? 'add' : 'remove';

    projectsContainer.classList[method]('js-NoCards');
  }

  function assignFilteredOutClass(_ref) {
    var cardEl = _ref.cardEl,
        cardInnerText = _ref.cardInnerText;

    var searchRegex = new RegExp([searchTerm].filter(function (str) {
      return !!str;
    }).join('|'), 'gi');

    var show = searchTerm === '' || searchRegex.test(cardInnerText);

    var method = show ? 'remove' : 'add';

    cardEl.classList[method]('js-Filtered');

    return show;
  }

  function updateQueryParams() {
    var newState = [
    // "filter-list" text-input
    searchTerm ? 'searchTerm=' + searchTerm : ''].filter(function (str) {
      return !!str;
    }).join('&');

    history.replaceState({}, '', '?' + newState);
  }

  function getParameterByName(name, url) {
    name = name.replace(/[[\]]/g, '\\$&');

    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    var results = regex.exec(url || window.location.href);

    if (!results) {
      return null;
    }

    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
})();

