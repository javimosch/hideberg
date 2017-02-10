/*global angular*/
/*global i18n*/
angular.module('config_app_router', []).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        if(window.__settings && window.__settings.isApp==false) return;
        
        $routeProvider.
        when('/' + i18n.ROUTE_DASHBOARD, {
            templateUrl: '/includes/dashboard.html'
        }).
        when('/' + i18n.ROUTE_SIGN_IN, {
            templateUrl: '/includes/sign-in.html'
        }).
        when('/' + i18n.ROUTE_SIGN_UP, {
            templateUrl: '/includes/sign-up.html'
        }).
        when('/' + i18n.ROUTE_CREATE_EVENT, {
            templateUrl: '/includes/create-event.html'
        }).
        when('/' + i18n.ROUTE_PROFILE, {
            templateUrl: '/includes/profile.html'
        }).
        when('/' + i18n.ROUTE_EDIT_EVENT + '/:id', {
            templateUrl: '/includes/create-event.html'
        }).
        when('/' + i18n.ROUTE_EXPLORE, {
            templateUrl: '/includes/explore-events.html'
        }).
        when('/' + i18n.ROUTE_GET_IN_TOUCH, {
            templateUrl: '/includes/get-in-touch.html'
        }).
        when('/' + i18n.ROUTE_SUBSCRIBE, {
            templateUrl: '/includes/subscribe.html'
        }).
        
         when('/backoffice', {
            templateUrl: '/includes/bo-home.html'
        }).
         when('/backoffice/users/:id', {
            templateUrl: '/includes/bo-users.html'
        }).
         when('/backoffice/logs/:id', {
            templateUrl: '/includes/bo-logs.html'
        }).
         when('/backoffice/prerenders/:id', {
            templateUrl: '/includes/bo-prerenders.html'
        }).
        
        
        
        
        when('/project-manager', {
            templateUrl: '/includes/project-manager.html'
        }).
        when('/project-manager/:id', {
            templateUrl: '/includes/project.html'
        }).
        when('/task/:id', {
            templateUrl: '/includes/task.html'
        }).
        
        
        otherwise({
            redirectTo: '/' + i18n.ROUTE_SIGN_IN
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
