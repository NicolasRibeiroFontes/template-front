(function () {
    'use strict';

    angular.module('usuario.service', [])
        .service('usuarioService', usuarioService);

    usuarioService.$injector = [ '$rootScope', 'usuarioDataService' ];

    /** @ngInject */
    function usuarioService( $rootScope, usuarioDataService ) {

        var _usuarioService = {};

        _usuarioService.obterDadosUsuario = _obterDadosUsuario;

        return _usuarioService;

        function _obterDadosUsuario( callback, autorizacao, params ) {

            usuarioDataService.obterDadosUsuario()
                .then(sucessoDadosUsuario);

            function sucessoDadosUsuario (result) {

                $rootScope.dadosUsuario = {
                    nome: result.nome,
                    perfil : result.perfil,
                    perfilCodigo: result.perfilCodigo
                };

                callback(autorizacao, params);
            }
        }

    }
})();
