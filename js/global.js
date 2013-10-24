jQuery(document).ready(function () { 
 /* var havePermission = window.webkitNotifications.checkPermission();
if (havePermission !=0)
	window.webkitNotifications.requestPermission();
*/
  $( "#btnBuscar" ).bind( "click", function() {
//cargaBusqueda()
var cadena = {}
cadena.term = $('#txtBuscar').val()
 rapazz.miDirectorio.Autocompletar(cadena,function(valor){rapazz.miDirectorio.listarRegistros(valor)})
 
});



//Create the autocomplete
  $("#txtBuscar").autocomplete({
    source:  function(request, response) {rapazz.miDirectorio.Autocompletar(request, response)} ,
    minLength: 2,
    select: function(event, ui) {

var arreglo = []

arreglo.push(ui.item)

     rapazz.miDirectorio.listarRegistros(arreglo)
    }


	});

}); 


