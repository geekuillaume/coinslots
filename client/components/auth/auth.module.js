'use strict';

angular.module('coinslotApp.auth', [
  'coinslotApp.constants',
  'coinslotApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
