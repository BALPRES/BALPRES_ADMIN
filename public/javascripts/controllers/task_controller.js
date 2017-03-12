app
    .factory( 'TaskRepository', [ '$http', function( $http) {
        return({
            getAll : function( ) {
                return $http({
                    url : '/task',
                    method : 'GET'
                });
            },
            add : function( data ) {
                var jsonData = JSON.stringify( data );
                return $http({
                    url : '/task',
                    method : 'POST',
                    data : jsonData
                });
            },
            getAssigned : function() {
                return $http({
                    url : '/task/assigned/',
                    method : 'GET'
                });
            },
            validateData : function( data, scope ) {
                var ban = true;
                scope.errors = "";
                if( data.name.length < 1 && data.name.length > 100 ) {
                    ban = false;
                    scope.errors += "Escriba un nombre válido. \n";
                }
                if( data.description.length < 1 && data.description.length > 500 ) {
                    ban = false;
                    scope.errors += "Escriba una descripción válida. \n";
                }
                if( data.date_end.length < 6 ) {
                    ban = false;
                    scope.errors += "Seleccione una fecha válida."
                }
                if( data.user_assigned.user.id == 0 ) {
                    ban = false;
                    scope.errors += "Seleccione un responsable válido. \n";
                }
                if( data.value == 0 ) {
                    ban = false;
                    scope.errors += "Seleccione un rango válido. \n";
                }
                return ban;
            }
        });
    }])
    .controller( 'task-controller',
                [   '$scope',
                    '$location',
                    '$routeParams',
                    '$mdDialog',
                    'TaskRepository',
                    'AuthRepository',
                    function(
                        $scope,
                        $location,
                        $routeParams,
                        $mdDialog,
                        TaskRepository,
                        AuthRepository ) {

        if( AuthRepository.viewVerification() ) {

            $scope.title = "Tareas";

            var allTasks = function() {
                TaskRepository.getAll().success( function( data ) {
                    if( !data.error ) {
                        var the_data = data.data;
                        $scope.tasks = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            var allAssignedTasks = function() {
                TaskRepository.getAssigned().success( function( data ) {
                    if( !data.error ) {
                        var the_data = data.data;
                        $scope.assigned_tasks = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            var getAllUsers = function() {
                AuthRepository.getUserCat().success( function( data ) {
                    if( !data.error ) {
                        var the_data = data.data;
                        $scope.users = the_data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
            };

            var setAllValues = function(){
                $scope.values = [
                    { "name" : "importante", "id" : 3 },
                    { "name" : "normal", "id" : 2 },
                    { "name" : "no importante", "id" : 1 }
                ];
            };

            var initTask = function() {
                $scope.task = {
                    name : "",
                    description : "",
                    value : $scope.values[2],
                    date_end : "",
                    user_assigned : { user : { id : 0, username : "" } }
                };
            };

            allTasks();
            allAssignedTasks();
            setAllValues();
            getAllUsers();
            initTask();

            $scope.add = function( ) {

                $scope.task.date_end = document.getElementById( 'date_end' ).value;
                $scope.task.value = $scope.task.value.id;

                if( TaskRepository.validateData( $scope.task, $scope ) ) {

                    $scope.task.user_assigned = $scope.task.user_assigned.user.id;

                    TaskRepository.add( $scope.task ).success( function( data ) {
                        if( !data.error ) {
                            initTask();
                            allTasks();
                            allAssignedTasks();
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
            };
        }
    }])
    .filter( 'getValueName', function() {
        return function( value ) {
            var values = new Array();
            values[1] = "importante";
            values[2] = "Normal";
            values[3] = "No importante";
            return values[value];
        };
    });
