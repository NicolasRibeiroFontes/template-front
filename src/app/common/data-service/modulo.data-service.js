(function () {
    'use strict';

    angular.module('modulo.data-service', [])
        .service('moduloDataService', moduloDataService);

    moduloDataService.$injector = ['$http', 'API', '$log'];

    /** @ngInject */
    function moduloDataService( $http, API, $log ) {

        var _moduloDataService = {};
        var modulos = [
            {ordem:1,descricao:'Arquivo Digital',state:'#',icone:'fa fa-plus',modulosFilho:[
                {ordem:1,descricao:'Biblioteca Digital',state:'',icone:'fa fa-plus'},
                {ordem:2,descricao:'Documentos Publicados',state:'',icone:'fa fa-plus'},
            ]},
            {ordem:2,descricao:'Circulares/Orientações',state:'#',icone:'fa fa-check',modulosFilho:[
                {ordem:1,descricao:'Orientador Fiscal',state:'',icone:'fa fa-check'},
                {ordem:2,descricao:'Orientador DP',state:'',icone:'fa fa-check'},
                {ordem:3,descricao:'Orientador Contábil',state:'',icone:'fa fa-check'},
                {ordem:4,descricao:'Informativo Mury',state:'',icone:'fa fa-check'},
                {ordem:5,descricao:'Boletim Trabalhista',state:'',icone:'fa fa-check'},
                {ordem:6,descricao:'Boletim Fiscal',state:'',icone:'fa fa-check'},
                {ordem:7,descricao:'Boletim Contábil',state:'',icone:'fa fa-check'},
                {ordem:8,descricao:'Ata de Reunião',state:'',icone:'fa fa-check'}
            ]},
            {ordem:3,descricao:'Solicitações de Serviço',state:'#',icone:'fa fa-code',modulosFilho:[
                {ordem:1,descricao:'Painel de Solicitações de Serviço',state:'app.painelsolicitacoesservicos',icone:'fa fa-check'},
                {ordem:2,descricao:'Aguardando Aprovação de OS',state:'app.aguardandoaprovacaoos',icone:'fa fa-check'},
                {ordem:3,descricao:'Pendentes de Retorno do Cliente',state:'app.pendentesretornocliente',icone:'fa fa-check'},
                {ordem:4,descricao:'Solicitações Finalizadas',state:'app.solicitacoesfinalizadas',icone:'fa fa-check'}
            ]}
        ]

        _moduloDataService.obterModuloPorPerfil = _obterModuloPorPerfil ;
        _moduloDataService.checarPermissao = _checarPermissao ;

        return _moduloDataService;


        function _obterModuloPorPerfil()  {
            return modulos;
            // return $http.get(API.URL + 'modulo/obterModulosPorPerfil')
            //     .then( success )
            //     .catch( error );

            // function success( data ) {
            //     return data.data;
            // }

            // function error( error ) {

            //     var mensagem = 'XHR Failed for obterModulosPorPerfil';

            //     if (error.data && ( error.data.message || error.data.description) )
            //         mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

            //     $log.error(mensagem);

            //     throw error;
            // }

        }

        function _checarPermissao( state )  {
            return {tokenExpirado:false,permissao:true};
            // return $http.post(API.URL + 'modulo/checarPermissao', state)
            //     .then( success )
            //     .catch( error );

            // function success( data ) {
            //     return data.data;
            // }

            // function error( error ) {

            //     var mensagem = 'XHR Failed for checarPermissao';

            //     if (error.data && ( error.data.message || error.data.description) )
            //         mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

            //     $log.error(mensagem);

            //     throw error;
            // }

        }

    }
})();
