(function () {
    'use strict';

    angular.module('cadastro', [
        'cadastro.usuario'
        ])
        .config(cadastroConfig);

    /** @ngInject */
    function cadastroConfig($stateProvider) {

        $stateProvider
            .state('app.cadastro', {
                url: 'cadastro'
            });
    }

})();
