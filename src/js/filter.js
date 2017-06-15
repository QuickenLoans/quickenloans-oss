(function(){
	'use strict';

	let filters = [];
	let searchTerm = '';

	const projectCards = Array.from(document.querySelectorAll('.project--card'));
	const projectCardsWithInnerText = projectCards.map(cardEl => {return {cardEl: cardEl, cardInnerText: _getAllInnerText(cardEl)}});

	const filterInput = document.querySelector('#filter');
	const quickFilters = document.querySelector('.quick-filters');
	const projectsContainer = document.querySelector('.projects-container');

	filterInput.addEventListener('input', enteredSearchTerm);
	quickFilters.addEventListener('click', clickedFilterTerm)

	function _getAllInnerText(el) {
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
		let n, ary = [];
		while(n = walker.nextNode()) ary.push(n.textContent);
		return ary.join(' ').replace(/\s\s+/g, ' ');
	}

	function enteredSearchTerm(e) {
		searchTerm = e.target.value;
		assignFilterClasses();
	}

	function clickedFilterTerm(e) {
		const filterText = e.target.innerText;
		const filterIndex = filters.findIndex(text=>text===filterText);
		if(filterIndex > -1)
			filters.splice(filterIndex, 1);
		else
			filters.push(filterText);
		assignFilterClasses();
	}

	function assignFilterClasses() {
		const shownCards = projectCardsWithInnerText
							.filter(assignFilteredOutClass);
		if(shownCards.length === 0)
			projectsContainer.classList.add('no-cards-shown');
		else
			projectsContainer.classList.remove('no-cards-shown');			
	}

	function assignFilteredOutClass({cardEl: cardEl, cardInnerText: cardInnerText}){
		const searchRegex = new RegExp(
								filters.map(text=>text).join('|') 
								+ (filters.length > 0 && searchTerm !== '' && '|' || '')
								+ searchTerm
								, 'gi');
		const show = searchRegex.test(cardInnerText) || (filters.length === 0 && searchTerm === '');
		if(show)
			cardEl.classList.remove('filtered-out');
		else
			cardEl.classList.add('filtered-out');
		return show;
	}
})();
