export const LCHVitrinePageLinksHighlightAddIsHidden = function() {
	return document.querySelector('style.LCHVitrinePageLinksHighlightAdd');
};

export const LCHVitrinePageLinksHighlightAddCallback = function() {
	let element = document.body.appendChild(document.createElement('style'))

	element.classList.add('LCHVitrinePageLinksHighlightAdd')
	element.innerHTML = `a { background: yellow !important; }`
};

export const LCHVitrinePageLinksHighlightAddRecipe = function() {
	return {
		LCHRecipeCallback: LCHVitrinePageLinksHighlightAddCallback,
		LCHRecipeSignature: 'LCHVitrinePageLinksHighlightAdd',
		LCHRecipeIsExcluded: LCHVitrinePageLinksHighlightAddIsHidden,
	};
};
