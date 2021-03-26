exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/launchxr',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLaunchxrRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};

exports.OLSKControllerStaticAssetFiles = function () {
	return [
		'stub-behaviour.js',
	];
};
