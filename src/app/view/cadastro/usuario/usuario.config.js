(function () {
    'use strict';

    angular.module('cadastro.usuario', ['usuario.controller'])
        .config(usuarioConfig);

    usuarioConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function usuarioConfig($stateProvider) {
        $stateProvider
            .state('app.cadastro.usuario', {
                url: '/usuario',
                views: {
                    '@': {
                        templateUrl: 'app/view/cadastro/usuario/usuario.html',
                        controller: 'UsuarioController',
                        controllerAs: "vm",
                        resolve: {
                            listaPerfis: obterPerfis,
                            listaUsuarios: obterUsuarios
                        }
                    }
                }
            });

        function obterPerfis(perfilDataService) {
            return perfilDataService.obterAtivos();
        }

        function obterUsuarios(usuarioDataService) {
            return usuarioDataService.obterUsuarios();
        }

    }
})();
