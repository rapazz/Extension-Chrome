jQuery(document).ready(function () { 
  
  $( "#btnBuscar" ).bind( "click", function() {
 //cargaBusqueda()
 getContacts()
 
});


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


