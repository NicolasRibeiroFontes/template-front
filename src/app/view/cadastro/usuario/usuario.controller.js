(function () {
    'use strict';

    angular.module('usuario.controller', [])
        .controller('UsuarioController', UsuarioController);

    UsuarioController.$injector = ['$state', '$log', 'listaPerfis', 'usuarioDataService', 'listaUsuarios', 'gridFactory', 'loadingService', 'toastrService'];

    /** @ngInject */
    function UsuarioController($state, $log, listaPerfis, usuarioDataService, listaUsuarios, gridFactory, loadingService, toastrService) {

        var vm = this;

        vm.perfis = listaPerfis;
        vm.usuarios = listaUsuarios;
        vm.bloquearCampos = true;
        vm.existeEzAuth = true;

        vm.obterUsuarios = _obterUsuarios;
        vm.obterUsuarioPorCPF = _obterUsuarioPorCPF;
        vm.salvar = _salvar;
        vm.voltar = _voltar;
        vm.verificaBuscaCPF = _verificaBuscaCPF;
        vm.obterTabelaColunas = _obterTabelaColunas;
        vm.obterTabelaMenuTabela = _obterTabelaMenuTabela;
        vm.obterTabelaMenuLinha = _obterTabelaMenuLinha;

        var colunasTabela = gerarColunas();
        var menuTabela = gerarMenuTabela();
        var menuLinha = gerarMenuLinha();

        function _obterTabelaColunas() {
            return colunasTabela;
        }

        function _obterTabelaMenuTabela() {
            return menuTabela;
        }

        function _obterTabelaMenuLinha() {
            return menuLinha;
        }

        function _verificaBuscaCPF() {

            if (vm.novoUsuario)
                removerPontosHifens(vm.cpf).length === 11 ? vm.obterUsuarioPorCPF() : angular.noop();

        }

        function _voltar() {
            $state.forceReload();
        }

        function _salvar() {

            loadingService.show();

            var _usuario = {};

            _usuario.id = vm.usuarioID;
            _usuario.nome = vm.nome;
            _usuario.email = vm.email;
            _usuario.cargo = vm.cargo;
            _usuario.telefoneComercial = vm.telefoneComercial;
            _usuario.telefoneResidencial = vm.telefoneResidencial;
            _usuario.telefoneCelular = vm.telefoneCelular;
            _usuario.ativo = vm.ativo;
            _usuario.login = vm.login;
            _usuario.senha = vm.senha;
            _usuario.confirmarSenha = vm.confirmarSenha;
            _usuario.cpf = removerPontosHifens(vm.cpf);
            _usuario.perfilID = vm.perfil.id;
            _usuario.existeEzAuth = vm.existeEzAuth;

            usuarioDataService.salvar(_usuario)
                .then(sucesso)
                .catch(erro);

            function sucesso() {

                angular.element('#modalDadosUsuario').modal('hide');
                loadingService.hide();
                toastrService.sucesso('Dados salvos com sucesso!', 'Cadastro de Usuário');
                vm.obterUsuarios();

            }

            function erro(error) {

                $log.error(error);
                loadingService.hide();
                toastrService.erro('Não foi possível salvar os dados', 'Cadastro de Usuário');
                return error;
            }

        }

        function _obterUsuarios() {

            loadingService.show();

            usuarioDataService.obterUsuarios()
                .then(sucesso)
                .catch(erro);

            function sucesso(result) {

                vm.usuarios = result;
                loadingService.hide();

            }

            function erro(error) {

                loadingService.hide();
                return error;
            }
        }

        function _obterUsuarioPorCPF() {

            loadingService.show();

            vm.buscarCPF = true;

            usuarioDataService.obterUsuarioPorCPF(removerPontosHifens(vm.cpf))
                .then(sucesso)
                .catch(erro);

            function sucesso(result) {
                vm.nome = result.nome;
                vm.email = result.email;
                vm.cargo = result.cargo;
                vm.telefoneComercial = result.telefoneComercial;
                vm.telefoneResidencial = result.telefoneResidencial;
                vm.telefoneCelular = result.telefoneCelular;
                vm.ativo = result.ativo;
                vm.login = result.login;
                vm.existeEzAuth = result.existeEzAuth;

                vm.buscarCPF = false;
                vm.bloquearCampos = false;

                toastrService.atencao('Usuário localizado! Se necessário, atualize os dados.');
                loadingService.hide();

            }

            function erro(error) {
                vm.buscarCPF = false;
                loadingService.hide();
                return error;
            }
        }

        function gerarColunas() {
            return [
                new gridFactory.coluna('Nome', function (item) {
                    return item.nome;
                }, 30, 0),
                new gridFactory.coluna('Login', function (item) {
                    return item.login;
                }, 60, 0),
                new gridFactory.coluna('Email', function (item) {
                    return item.email;
                }, 60, 0),
                new gridFactory.coluna('Perfil', function (item) {
                    return item.perfil;
                }, 30, 0)
            ];
        }

        function gerarMenuTabela() {
            return [
                {
                    icone: 'fa fa-plus',
                    titulo: 'Adicionar',
                    funcao: abrirModalDadosUsuarioNovo
                },
                {

                    naoExibir: true,
                    titulo: 'Gerar Excel CSV'
                },
                {
                    naoExibir: true,
                    titulo: 'Gerar Excel HTML'
                },
                {
                    naoExibir: true,
                    titulo: 'Gerar PDF'
                }];
        }

        function gerarMenuLinha() {
            return [
                {
                    icone: 'fa fa-edit',
                    titulo: 'Editar',
                    funcao: abrirModalDadosUsuarioEditar
                }
            ];
        }

        function removerPontosHifens(_string) {
            return _string.toString().replace(/-/g, '').replace(/\./g, '').replace(/\//g, '');
        }

        function reiniciarDados() {

            vm.novoUsuario = true;

            vm.usuarioID = null;
            vm.cpf = null;
            vm.usuarioID = null;
            vm.nome = null;
            vm.email = null;
            vm.cargo = null;
            vm.telefoneComercial = null;
            vm.telefoneResidencial = null;
            vm.telefoneCelular = null;
            vm.ativo = null;
            vm.login = null;
            vm.perfil = null;
            vm.existeEzAuth = true;
            vm.ativo = true;

            vm.buscarCPF = false;
            vm.bloquearCampos = true;

        }

        function abrirModalDadosUsuarioNovo() {

            loadingService.show();
            reiniciarDados();
            angular.element('#modalDadosUsuario').modal({backdrop: 'static', keyboard: false});
            loadingService.hide();

        }

        function abrirModalDadosUsuarioEditar(dadosUsuario) {

            loadingService.show();
            reiniciarDados();
            vm.novoUsuario = false;

            vm.usuarioID = dadosUsuario.id;
            vm.cpf = dadosUsuario.cpf;
            vm.nome = dadosUsuario.nome;
            vm.email = dadosUsuario.email;
            vm.cargo = dadosUsuario.cargo;
            vm.telefoneComercial = dadosUsuario.telefoneComercial;
            vm.telefoneResidencial = dadosUsuario.telefoneResidencial;
            vm.telefoneCelular = dadosUsuario.telefoneCelular;
            vm.ativo = dadosUsuario.ativo;
            vm.login = dadosUsuario.login;
            vm.existeEzAuth = dadosUsuario.existeEzAuth;

            vm.perfil = _.find(vm.perfis, {'id': dadosUsuario.perfilID});

            vm.bloquearCampos = false;

            angular.element('#modalDadosUsuario').modal({backdrop: 'static', keyboard: false});
            loadingService.hide();

        }
    }
})();
