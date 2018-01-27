(function () {
    'use strict';

    angular.module('constants-config', [])
        .constant(
            'API', {
                'URL': 'http://localhost:8091/api/' //dev
                //'URL': 'http://' + window.location.host + '/EscopoFornecedores.WebAPI/api/', //Server
            });

})();

