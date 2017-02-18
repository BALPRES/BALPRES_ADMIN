app
    .factory( 'SettingsRepository', [ '$http', function( $http ) {
        return({

        });
    }])
    .controller( 'settings-controller',
                    [
                        '$scope',
                        'AuthRepository',
                        'SettingsRepository',
                        function(
                            $scope,
                            AuthRepository,
                            SettingsRepository ) {
        if( AuthRepository.viewVerification() ){
            $scope.title = "Ajustes";
            $scope.save_no_alerts = function() {};
            $scope.save_emails_alert = function() {};
            $scope.save_email_contact = function() {};
            $scope.save_ticket_prices = function() {};
            $scope.save_signature = function() {};
        }
    }]);
