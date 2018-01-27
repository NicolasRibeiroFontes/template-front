(function () {
    'use strict';

    angular.module('login.controller', [])
        .controller('LoginController', LoginController);

    LoginController.$injector = [ '$state', 'localStorageService', 'toastrService', 'loginDataService' ];

    /** @ngInject */
    function LoginController( $state, localStorageService, toastrService, loginDataService ) {

        var vm = this;
        vm.loading = false;
        
        var usuarioPermitido = {
            login:'mury',
            senha:'mury'
        }


        if (localStorageService.get('authData'))
            $state.go('app.home');

        vm.autenticar = _autenticar;

        function _autenticar() {

            vm.loading = true;
            if (vm.formLogin){
                if (vm.formLogin.login!=usuarioPermitido.login || vm.formLogin.senha!=usuarioPermitido.senha){
                    vm.loading = false;
                    toastrService.erro('Atenção', 'Usuário/Senha inválidos');
                }else{                    
                    vm.loading = false;
                    $state.go(localStorageService.get("rotaDefinida") ? localStorageService.get("rotaDefinida") : 'app.home');
                }
            }else{
                vm.loading = false;
                toastrService.erro('Atenção', 'Usuário/Senha inválidos');
            }
        }
    }
})();
