(function () {
    'use strict';

    angular.module('usuario.data-service', [])
        .service('usuarioDataService', usuarioDataService);

    usuarioDataService.$injector = ['$http', 'API', '$log'];

    /** @ngInject */
    function usuarioDataService($http, API, $log) {

        var _usuarioDataService = {};

        _usuarioDataService.obterUsuarioPorCPF = _obterUsuarioPorCPF;
        _usuarioDataService.salvar = _salvar;
        _usuarioDataService.atualizar = _atualizar;
        _usuarioDataService.obterUsuarios = _obterUsuarios;
        _usuarioDataService.obterDadosUsuario = _obterDadosUsuario;
        _usuarioDataService.recuperarSenha = _recuperarSenha;
        _usuarioDataService.trocarSenha = _trocarSenha;

        return _usuarioDataService;


        //Métodos
        function _obterUsuarios() {
            return $http.get(API.URL + 'usuario/obterUsuarios')
                .then(success)
                .catch(error);

            function success(data) {
                return data.data;
            }

            function error(error) {

                var mensagem = 'XHR Failed for obterUsuarios';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }
        }

        function _obterUsuarioPorCPF(cpf) {
            return $http.get(API.URL + 'usuario/obterUsuarioEzAuthPorCPF/' + cpf)
                .then(success)
                .catch(error);

            function success(data) {
                return data.data;
            }

            function error(error) {
                var mensagem = 'XHR Failed for obterUsuarioEzAuthPorCPF';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }
        }

        function _salvar(model) {

            return $http.post(API.URL + 'usuario/salvar', model)
                .then(sucesso)
                .catch(erro);

            function sucesso(response) {
                return response.data;
            }

            function erro(error) {
                var mensagem = 'XHR Failed for cadastrar';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

        function _atualizar(model) {

            return $http.post(API.URL + 'usuario/atualizar', model)
                .then(sucesso)
                .catch(erro);

            function sucesso(response) {
                return response.data;
            }

            function erro(error) {
                var mensagem = 'XHR Failed for atualizar';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

        function _obterDadosUsuario()  {

            return $http.get(API.URL + 'usuario/obterDadosUsuario')
                .then( success )
                .catch( error );

            function success( data ) {
                return data.data;
            }

            function error( error ) {

                var mensagem = 'XHR Failed for obterDadosUsuario';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

        function _recuperarSenha( model )  {

            return $http.post(API.URL + 'usuario/recuperarSenha', model)
                .then( success )
                .catch( error );

            function success( data ) {
                return data.data;
            }

            function error( error ) {

                var mensagem = 'XHR Failed for recuperarSenha';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

        function _trocarSenha( model )  {

            return $http.post(API.URL + 'usuario/trocarSenha', model)
                .then( success )
                .catch( error );

            function success( data ) {
                return data.data;
            }

            function error( error ) {

                var mensagem = 'XHR Failed for trocarSenha';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }
    }
})();
