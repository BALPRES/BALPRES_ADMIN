app
    .factory( 'SettingsRepository', [ '$http', function( $http ) {
        return({
            getAlertNumbers : function() {
                return $http({
                    method : 'GET',
                    url : '/settings/alertnumbers/'
                });
            },
            getAlertEmails : function() {
                return $http({
                    method : 'GET',
                    url : '/settings/alertemails/'
                });
            },
            getContactEmail : function() {
                return $http({
                    method : 'GET',
                    url : '/settings/contactemail/'
                });
            },
            getTicketPrices : function() {
                return $http({
                    method : 'GET',
                    url : '/settings/ticketprices/'
                });
            },
            getSignatures : function() {
                return $http({
                    method : 'GET',
                    url : '/settings/signatures/'
                });
            },
            editAlertNumbers : function( data ) {
                return $http({
                    method : 'PUT',
                    url : '/settings/alertnumbers/',
                    data : JSON.stringify( data )
                });
            },
            editAlertEmails : function( data ) {
                return $http({
                    method : 'PUT',
                    url : '/settings/alertemails/',
                    data : JSON.stringify( data )
                });
            },
            editContactEmail : function( data ) {
                return $http({
                    method : 'PUT',
                    url : '/settings/contactemail/',
                    data : JSON.stringify( data )
                });
            },
            editTicketPrices : function( data ) {
                return $http({
                    method : 'PUT',
                    url : '/settings/ticketprices/',
                    data : JSON.stringify( data )
                });
            },
            editSignatures : function( data ) {
                return $http({
                    method : 'PUT',
                    url : '/settings/signatures/',
                    data : JSON.stringify( data )
                });
            }
        });
    }])
    .controller( 'settings-controller',
                    [
                        '$scope',
                        '$location',
                        'AuthRepository',
                        'SettingsRepository',
                        function(
                            $scope,
                            $location,
                            AuthRepository,
                            SettingsRepository ) {
        if( AuthRepository.viewVerification() ){

            $scope.title = "Ajustes";
            $scope.no_alerts_des = "Números de alerta; estos números telefónicos servirán para mandar alertas inmediatas SMS de reservaciones.";
            $scope.emails_alert_des = "Correos de alerta; estos correos servirán para mandar alertas inmediatas por EMAIL de reservaciones.";
            $scope.email_contact_des = "Correo de contacto; este contacto servirá para el contacto directo cliente-empresa. Estará disponible en la sitio principal así como en los recibos y correos.";
            $scope.ticket_prices_des = "Precios de boletos; son con los que se harán calculos de ventas sobre entradas.";
            $scope.signature_des = "Firma de recibos; esta firma servirá para futuros documentos automáticos que necesiten firma de encargado.";

            SettingsRepository.getAlertNumbers().success( function( data ) {
                if( !data.error ) {
                    $scope.alertnumbers = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            SettingsRepository.getAlertEmails().success( function( data ) {
                if( !data.error ) {
                    $scope.alertemails = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            SettingsRepository.getContactEmail().success( function( data ) {
                if( !data.error ) {
                    $scope.contactemail = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            SettingsRepository.getTicketPrices().success( function( data ) {
                if( !data.error ) {
                    $scope.ticketprices = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            SettingsRepository.getSignatures().success( function( data ) {
                if( !data.error ) {
                    $scope.signatures = data.data;
                } else {
                    $scope.errors = data.message;
                }
            }).error( function( error ) {
                $scope.errors = error;
            });

            $scope.save_no_alerts = function() {
                SettingsRepository.editAlertNumbers( $scope.alertnumbers ).success( function( data ) {
                    if( !data.error ) {
                        $scope.alertnumbers = data.data;
                        $location.path( '/settings/' );
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            $scope.save_emails_alert = function() {
                SettingsRepository.editAlertEmails( $scope.alertemails ).success( function( data ) {
                    if( !data.error ) {
                        $scope.alertemails = data.data;
                        $location.path( '/settings/' );
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };
            $scope.save_email_contact = function() {
                SettingsRepository.editContactEmail( $scope.contactemail ).success( function( data ) {
                    if( !data.error ) {
                        $scope.contactemail = data.data;
                        $location.path( '/settings/' );
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };
            $scope.save_ticket_prices = function() {
                SettingsRepository.editTicketPrices( $scope.ticketprices ).success( function( data ) {
                    if( !data.error ) {
                        $scope.ticketprices = data.data;
                        $location.path( '/settings/' );
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };
            $scope.save_signature = function() {};
        }
    }]);
