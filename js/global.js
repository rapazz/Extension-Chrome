jQuery(document).ready(function () { 
 /* var havePermission = window.webkitNotifications.checkPermission();
if (havePermission !=0)
	window.webkitNotifications.requestPermission();
*/
  


//Create the autocomplete
  $("#txtBuscar").autocomplete({
    source:  function(request, response) {rapazz.miDirectorio.Autocompletar(request, response)} ,
    minLength: 2,
    select: function(event, ui) {


  //  	ui.item.person.nombreCompleto)
     rapazz.miDirectorio.listarRegistros(event,ui.item.person)
    }


	});

}); 


