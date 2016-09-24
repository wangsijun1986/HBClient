//
// Configuration paths are relative to folder in which gulp is executed.
// In this case our parent directory (where gulpfile.js lives along with
// package.json and node_modules).
//
module.exports =  {

	base: './',

	dist: 'dist/',

	vendorjs: [
		"./node_modules/jquery/dist/jquery.min.js",
		"./node_modules/underscore/underscore-min.js",
		"./node_modules/angular/angular.min.js",
		"./node_modules/angular-cookies/angular-cookies.min.js",
		"./node_modules/slick-carousel/slick/slick.js",
		"./node_modules/angularslick/dist/slick.js",

		"./node_modules/angular-ui-router/release/angular-ui-router.min.js",
		"./node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js",
		"./node_modules/angular-filter/dist/angular-filter.min.js",

		"./node_modules/angular-animate/angular-animate.js",
		"./node_modules/angular-translate/dist/angular-translate.min.js",
		"./node_modules/restangular/dist/restangular.min.js",

		"./node_modules/video.js/dist/video.js",
		"./node_modules/videojs-rotatezoom/src/videojs.zoomrotate.js",

		"./node_modules/d3/d3.min.js",
		"./node_modules/nvd3/nv.d3.min.js",
		"./node_modules/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min.js",

		"./node_modules/angular-smart-table/dist/smart-table.min.js",
		"./node_modules/angular-ui-grid/ui-grid.min.js",
		"./node_modules/angular-strap/dist/angular-strap.js",
		"./node_modules/angular-strap/dist/angular-strap.tpl.js",

		"./node_modules/angulartics/dist/angulartics.min.js",
		"./node_modules/angulartics/dist/angulartics-ga.min.js",

		"./node_modules/alasql/dist/alasql.min.js",
		"./node_modules/dateformat/lib/dateformat.js",
		"./node_modules/angular-tree-control/angular-tree-control.js",
		"./node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js",

		"./app/modules/bing.maps.module.js",
		"./app/modules/FileSaver.js",
		"./node_modules/moment/moment.js",
		"./node_modules/angular-moment/angular-moment.min.js",
		"./node_modules/moment/locale/pt.js",
    	"./node_modules/angular-feature-toggle/dist/angular-feature-toggle.js",
		"./app/modules/bowser.js"
	],

	vendormap: [
		"./node_modules/angular/angular.min.js.map"
	],

	vendorcss: [
		"./node_modules/bootstrap/dist/css/bootstrap.min.css",
		"./node_modules/angular-ui-grid/ui-grid.min.css",
		"./node_modules/font-awesome/css/font-awesome.min.css",
		"./node_modules/nvd3/nv.d3.min.css",
		"./node_modules/video.js/dist/video-js.min.css",
		"./node_modules/angular-tree-control/css/tree-control.css",
		"./node_modules/angular-tree-control/css/tree-control-attribute.css",
		"./node_modules/slick-carousel/slick/slick.css",
		"./node_modules/slick-carousel/slick/slick-theme.css"
	],

	vendorfiles: [
		"./node_modules/angular-ui-grid/ui-grid.svg",
		"./node_modules/angular-tree-control/images/node-closed-light.png",
		"./node_modules/angular-tree-control/images/node-opened-light.png"
	],

	vendorassets: [
		"./node_modules/angular-ui-grid/ui-grid.ttf",
		"./node_modules/angular-ui-grid/ui-grid.woff"
	]
};


