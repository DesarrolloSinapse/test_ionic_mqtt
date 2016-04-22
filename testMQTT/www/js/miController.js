angular.module('starter.miController', [])
    .controller('miController', function ($scope,$location) {

    $scope.conexion = function (con) {
        console.log("prueba de conexion");

        if (con.usuario === undefined) { con.usuario = "" };
        if (con.password === undefined) { con.password = "" };
        if (con.ssl === undefined) { con.ssl = false };
  
        cliente = new Paho.MQTT.Client(con.servidor, con.puerto, con.id_con + parseInt(Math.random() * 100, 10));

        cliente.onConnectionLost = onConnectionLost;
        cliente.onMessageArrived = onMessageArrived;

        var options = {
            userName: con.usuario,
            password: con.password,
            onSuccess: onConnect,
            useSSL: con.ssl
        };

        cliente.connect(options)
    };

    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        //open('/suscripciones');
        $location.path('/suscripciones')
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    };

    function onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
    }


    }).config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider.state('index', {
            url: '/index',
            abstract: false,
            templateUrl: '/index.html'
        })
        .state('suscripciones', {
            url: '/suscripciones',
            templateUrl: '/views/suscripciones.html'
        })
    });