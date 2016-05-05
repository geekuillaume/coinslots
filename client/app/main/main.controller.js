'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('coinslots');
    });
  }

  $onInit() {
    this.$http.get('/api/coinslots').then(response => {
      this.coinslots = response.data;
      this.socket.syncUpdates('coinslot', this.coinslots);
    });
  }

  addCoinslot() {
    if (this.newCoinslot) {
      this.newCoinslot.amount = 0;
      this.$http.post('/api/coinslots', this.newCoinslot);
      this.newCoinslot = {};
    }
  }

  addMoney(coinslot) {
    coinslot.amount += 1;
    this.$http.put('/api/coinslots/' + coinslot._id, coinslot);
  }

  lessMoney(coinslot) {
    coinslot.amount -= 1;
    this.$http.put('/api/coinslots/' + coinslot._id, coinslot);
  }

  deleteCoinslot(coinslot) {
    this.$http.delete('/api/coinslots/' + coinslot._id);
  }
}

angular.module('coinslotApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
