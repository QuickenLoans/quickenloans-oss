(function(){
	'use strict';

	const projectCards = [].slice.call(document.querySelectorAll('.project--card'), 0);
	const projectCardsWithInnerText = projectCards.map(cardEl => {return {cardEl: cardEl, cardInnerText: getAllInnerText(cardEl)}});

	const filterInput = document.querySelector('#filter');
	const quickFilters = document.querySelector('.quick-filters');
	const projectsContainer = document.querySelector('.projects-container');

	let filters = getParameterByName('filters') ? getParameterByName('filters').split(',') : [];
	let searchTerm = getParameterByName('searchTerm') || '';
	filterInput.value = searchTerm;
	assignFilterClasses();
	assignSelectedClassToFilterItems();

	filterInput.addEventListener('input', debounce(enteredSearchTerm, 300));
	quickFilters.addEventListener('click', clickedFilterTerm)

	function debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this,
						args = arguments;
			let later = function() {
				timeout = null;
				if ( !immediate ) {
					func.apply(context, args);
				}
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait || 200);
			if ( callNow ) {
				func.apply(context, args);
			}
		}
	};

	function getAllInnerText(el) {
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
		let n, ary = [];
		while(n = walker.nextNode()) {
			ary.push(n.textContent);
		}
		return ary.join(' ').replace(/\s\s+/g, ' ');
	}

	function enteredSearchTerm(e) {
		searchTerm = e.target.value;
		assignFilterClasses();
	    updateQueryParams(filters, searchTerm);
	}

	function clickedFilterTerm(e) {
	    if(e.target.tagName !== 'LI') return;
		const filterText = e.target.innerText;
		const filterIndex = filters.findIndex(text=>text===filterText);
		(filterIndex > -1)
			? filters.splice(filterIndex, 1)
			: filters.push(filterText);
		assignFilterClasses();
	    updateQueryParams(filters, searchTerm);
	    assignSelectedClassToFilterItems();
	}

    function assignSelectedClassToFilterItems() {
        const filterItems = quickFilters.querySelectorAll('li');
        filterItems.forEach(filterItem => {
            (filters.find(filterText=>filterItem.innerText === filterText))
                ? filterItem.classList.add('selected')
                : filterItem.classList.remove('selected');

        });
    }

	function assignFilterClasses() {
		const shownCards = projectCardsWithInnerText
											.filter(assignFilteredOutClass);
		(shownCards.length === 0)
			? projectsContainer.classList.add('no-cards-shown')
			: projectsContainer.classList.remove('no-cards-shown');
	}

	function assignFilteredOutClass({cardEl, cardInnerText}){
		const searchRegex = new RegExp(
								filters.map(text=>text).join('|')
								+ (filters.length > 0 && searchTerm !== '' && '|' || '')
								+ searchTerm
								, 'gi');
		const show = searchRegex.test(cardInnerText) || (filters.length === 0 && searchTerm === '');
		show
			? cardEl.classList.remove('filtered-out')
			: cardEl.classList.add('filtered-out');
		return show;
	}

	function updateQueryParams(filters, searchTerm) {
	    const filtersParam = filters.length ? `filters=${filters.join(',')}` : '';
	    const searchTermParam = searchTerm ? `searchTerm=${searchTerm}` : '';
	    const bothExist = !!(filtersParam && searchTermParam);
	    const eitherExist = !!(filtersParam || searchTermParam);
        history
        .replaceState({}, '', `?${filtersParam}${bothExist ? '&' : ''}${searchTermParam}`);
	}

	function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", 'i'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})();
