require('./styles.scss');
const angular = require('angular');

const app = angular.module('sass-loader-bug', []);

app.controller('MainController', MainController);

function MainController() {
    'ngInject';

    this.one = 'this is One';
    this.two = 'this is Two';
}
