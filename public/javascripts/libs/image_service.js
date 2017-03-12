angular.module( 'image-service', [])
        .service( 'imageData', [ function() {
            this.api_uri = "https://balpres-be-gunt2raro.c9users.io/api/";
            this.getApiUri = function( ext ) {
                return this.api_uri + ext;
            };
        }])
        .factory( 'ImageRepository', [ '$http', 'imageData', function( $http, imageData ) {
            return({
                imageToCabin : function( id, data ) {
                    var jsonData = JSON.stringify( data );
                    return $http({
                        url : imageData.getApiUri( 'cabin/image/' + id ),
                        method : 'PUT',
                        data : jsonData
                    });
                },
                imageToArea : function( id, data ) {
                    var jsonData = JSON.stringify( data );
                    return $http({
                        url : imageData.getApiUri( 'area/image/' + id ),
                        method : 'PUT',
                        data : jsonData
                    });
                },
                image1ToOurCompanyContent : function( id, data ) {
                    var jsonData = JSON.stringify( data );
                    return $http({
                        url : imageData.getApiUri( 'website/ourcompanycontent/image1/' + id ),
                        method : 'PUT',
                        data : jsonData
                    });
                },
                image2ToOurCompanyContent : function( id, data ) {
                    var jsonData = JSON.stringify( data );
                    return $http({
                        url : imageData.getApiUri( 'website/ourcompanycontent/image2/' + id ),
                        method : 'PUT',
                        data : jsonData
                    });
                },
                imageToOurPersonalContent : function( id, data ) {
                    var jsonData = JSON.stringify( data );
                    return $http({
                        url : imageData.getApiUri( 'website/ourpersonalcontent/image/' + id ),
                        method : 'PUT',
                        data : jsonData
                    });
                }
            });
        }]);
