(function() {
	'use strict';
	
	angular
		.module('blocks.filter')
		.filter('yesNo', yesNoFilter);
		
	function yesNoFilter() {
		return function(input) {
			return input ? 'Oui' : 'Non';
		}
	}
})();