exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stubs/LCHLauncherPipeItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'LCHLauncherPipeItemStubRoute',
		OLSKRouteFunction: function(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};