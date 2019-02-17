alert("Funciona en STATIC");

var app=angular.module("app",["ngRoute"]);



app.directive('ppal', function() {
	  return {
//	    templateUrl: '/static/prueba.html'
		  templateUrl: 'html/menu.html'
	  };
	});

//ASIGNA LOS ITEM DEL MENU
app.config(function($routeProvider, $locationProvider) {
	   $routeProvider
	    .when("/mostrarjson", {
	    	templateUrl : 'html/mostrarjson.html',
	    	controller : "IndexController"	//Permite refrescar si hay cambios en las funciones del controlador
	    })
	   .when("/listarjson", {
	    	templateUrl : 'html/listarjson.html',
	    	controller : "IndexController"	
	    })
	     .when("/consultarformulario", {
	    	templateUrl : 'html/consultarformulario.html',
	    	controller : "IndexController"	
	    })
	     .when("/modificarformulario", {
	    	templateUrl : 'html/modificarformulario.html',
	    	controller : "IndexController"	
	    })
	    .when("/ingresarformulario", {
	    	templateUrl : 'html/ingresarformulario.html',
	    	controller : "IndexController"	
});
	   $locationProvider.html5Mode(true);
	//   $locationProvider.html5Mode(true).hashPrefix('#');
	});

function IndexController($scope, $http) {

	$scope.formulario = {
			id:"",
            cedula : "",
            nombre : ""
        };	
	
	var cedulaRespaldo = "";
	
//Campos requeridos	en formularios
	$scope.requeridoCedula=true;
	$scope.requeridoNombre=true;
//Fin campos requeridos
	
//Validaciones en formularios
	$scope.patternValidaSoloNumeros=/^[0-9]*$/;
	$scope.patternValidaSoloLetras=/^[a-zA-Z]*$/;
//Fin validaciones
	
//	$scope.activaEliminar=true;
	$scope.activaModificar=true;
		
//	$scope.activaConsultar=true;
/*	$scope.activaEliminar=function() {
		  return ($scope.requeridoNombreConsultar==false)
		}*/
	//Se activa cuando campo nombre esta activado
/*	$scope.activaModificar=function() {
		  return ($scope.requeridoNombreModificar==true)
		}*/
	refreshJson();
	var valor;
	
//Función que permite conseguir la información JSON
	 function refreshJson(){
	    $http({
         method: 'GET', 
         url: 'http://localhost:8080/mostrarjson'// recordar modificar la url y
       }).then(function succesCallback(response) {
           $scope.mostrarjson= response.data;   //esta linea del $scope con el nombre del servicio rest
       }, function errorCallback(response) {
       	 $scope.mostrarjson = response.statusText;
       });
	 }
//FIN Función que permite conseguir la información JSON

	 
//Función que permite Ingresar un registro
	$scope.f_ingresarFormulario=function() {	
		alert("Llega a ingresar");
			$http({
      method: 'POST', 
      url: 'http://localhost:8080/usuario',
      data : angular.toJson($scope.formulario),
          headers : {
        	  'Content-Type' : 'application/json'
          }
    }).then(function succesCallback(response) {
    //Se valida primero en el controlador de Spring-Java si existe el registro para que no se ingrese repetido
    //Si retorna cero el registro se agrego, si retorna 1 ya existe el registro	
    	alert("response.data: "+response.data);
    	if(response.data==0){
    		swal({
    			  position: 'top-end',
    			  type: 'success',
    			  title: 'Registro número: '+$scope.formulario.cedula+' ingresado correctamente!',
    			  showConfirmButton: false,
    			  timer: 1500
    			})
    		// alert("Registro agregado");
    		 $scope.formulario.cedula = "";
        	 $scope.formulario.nombre = ""; 
        	 refreshJson();
    	}else{
    		swal({
    			  type: 'error',
    			  title: 'Registro número: '+$scope.formulario.cedula+' ya existe!'
    			})
    	}
    			}, function errorCallback(response) {
    				$scope.mostrarjson = response.statusText;
    			});	
	}
//FIN Función que permite Ingresar un registro
	
    
//Función que permite Modificar un registro
	$scope.f_modificarFormulario=function() {	
//	alert("Llega a modificarFormulario $scope.formulario.id: "+$scope.formulario.id);
		swal({
			 html:
				    '<h4>Desea modificar el registro: '+cedulaRespaldo+'</h4>'+
				    '<h3>Por el registro número: '+$scope.formulario.cedula+'</h3>'+
				    '<h3>Nombre: '+$scope.formulario.nombre+'?</h3>',
				   
  		  type: 'warning',
  		  showCancelButton: true,
  		  confirmButtonColor: '#3085d6',
  		  cancelButtonColor: '#d33',
  		  confirmButtonText: 'SI'
  		}).then((result) => {
  			
  		  if (result.value) {
    $http({
      method: 'PUT', 
      url: 'http://localhost:8080/usuario',
      data : angular.toJson($scope.formulario),
          headers : {
        	  'Content-Type' : 'application/json'
          }
    }).then(function succesCallback(response) {
    	 $scope.mensaje = response.data; 
    	 swal({
			 
			  type: 'success',
			  title: 'Registro número: '+$scope.formulario.cedula+' modificado correctamente!',
			  showConfirmButton: false,
			  timer: 1500
			})
    	 //	alert("Registro Modificado")
    		 $scope.formulario.cedula = "";
        	 $scope.formulario.nombre = ""; 
        	 refreshJson();
        	 //$scope.activaModificar=true;
    			}, function errorCallback(response) {
    				$scope.mostrarjson = response.statusText;
    	});	
  		  }
		})
	}
//FIN Función que permite Modificar un registro

	
//Función que permite buscar desde un formulario cualquier campo del formato JSON    
	    $scope.f_enviarFormulario=function() {
	    	var encontrado = 0;
	    	alert("Llega a enviarFormulario $scope.formulario.cedula: "+$scope.formulario.cedula);
	    	  $http({
	              method: 'GET', 
	              url: 'http://localhost:8080/mostrarjson'// recordar modificar la url y
	            }).then(function succesCallback(response) {
	                $scope.mostrarUsuario = response.data;   //esta linea del $scope con el nombre del servicio rest
	         //       alert("$scope.mostrarUsuario : "+$scope.mostrarUsuario);
	         //       alert("$scope.mostrarUsuario.length : "+$scope.mostrarUsuario.length);
	                for ( i=0; i < $scope.mostrarUsuario.length; i++) {  
	          //      	 alert("id: "+$scope.mostrarUsuario[i].id);
	                    if($scope.mostrarUsuario[i].cedula == $scope.formulario.cedula){
	                    	alert("REGISTRO ENCONTRADO");
	                    	$scope.activaEliminar=false;
	                    	$scope.activaModificar=false;
	                    	$scope.activaNombreModificar=false;
	                    	$scope.formulario.id = $scope.mostrarUsuario[i].id;
	                    	cedulaRespaldo = $scope.mostrarUsuario[i].cedula;
	                    	alert("cedulaRespaldo"+cedulaRespaldo);
	                    	$scope.formulario.nombre = $scope.mostrarUsuario[i].nombre;
	                    	encontrado++;
	                    };
	                   
	                  };
	                  //Si registro no existe:
	                  //-Se envia alert
	                  //-Se limpian campos de formulario
	                  //-Se inactiva boton "eliminar"
	                  if(encontrado==0){
	                	  
	                	alert("REGISTRO NO EXISTE: "+$scope.formulario.cedula);
	                	swal({
	          			  type: 'info',
	          			  title: 'Registro número: '+$scope.formulario.cedula+' no esta registrado!'
	          			})
	                	//$scope.formulario.cedula="";
	                	//$scope.formulario.nombre="";
	                	//$scope.activaEliminar=true;
	                  };
	                  
	                  
	             //   $scope.formulario.nombre = mostrarUsuario.nombre;
	            }, function errorCallback(response) {
	            	 $scope.mostrarNombre = response.statusText;
	            });
	    }
//FIN Función que permite buscar desde un formulario cualquier campo del formato JSON   

	    
//Función que permite eliminar un registro 
	    $scope.f_eliminar= function(){
	    	if(cedulaRespaldo==$scope.formulario.cedula){
	    	var cedula_eliminada;
	    	swal({
	    		 html:
					    '<h4>Desea ELIMINAR el registro: '+cedulaRespaldo+'?</h4>',
	    		  type: 'warning',
	    		  showCancelButton: true,
	    		  confirmButtonColor: '#3085d6',
	    		  cancelButtonColor: '#d33',
	    		  confirmButtonText: 'SI'
	    		}).then((result) => {
	    			
	    		  if (result.value) {
	    			  cedula_eliminada = $scope.formulario.cedula;
	    			  $http({
	 		             method : "DELETE",
	 		             url : 'http://localhost:8080/eliminarregistro/'+$scope.formulario.id
	 		         }).then(function succesCallback(response) {
	 		        	 refreshJson();
	 		        	 $scope.formulario.id = "";
	 		        	 $scope.formulario.cedula = "";
	 		        	 $scope.formulario.nombre = "";
	 		        	 $scope.activaEliminar=true;
	 		        	 swal(
	 			    		      'Registro con la identificación: '+cedula_eliminada+' a sido eliminado',)
	 		         });
	    		  }
	    		})
	    	}else{
	    		swal({
        			  type: 'info',
        			html:
      				   '<h4>Registro ingresado inicialmente: '+cedulaRespaldo+'</h4>'+
      				   '<h4>no coincide con el registro actual</h4>'+
      				   '<h4>del campo número: '+$scope.formulario.cedula+'</h4>',
        			})
	    	}	
	    }
//FIN Función que permite eliminar un registro 	    
	     
};