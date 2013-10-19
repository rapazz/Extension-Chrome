//Objeto que maneja el directorio de contactos



 rapazz.miDirectorio ={} ;



rapazz.miDirectorio.obtenerInformacion = function (){

var blnBuscar =false 
 if (!localStorage["ultimoRegistro"]) {
    localStorage["ultimoRegistro"] = obtenerfecha()
    blnBuscar=true
  }

  if (datediff(localStorage["ultimoRegistro"],new Date(),'days') > 2)
 {
 	localStorage["ultimoRegistro"]= +new Date;
 	blnBuscar=true

 } 	
 if (blnBuscar){
 	rapazz.indexedDB.deleteAll()
var objDirectorio=[]
 $.ajax({
    url:constantes.servicioGoogle ,
    type:'GET',
    dataType:'JSONP',
    jsonpCallback:'jsonp',
    success: function(data){
     var  objDirectorio= data;
for (var x=0;x<objDirectorio.length;x++){
	rapazz.indexedDB.addContacto(objDirectorio[x])
}
//Pendiente crear Notificacion informando cambio
}
})

}
}
rapazz.miDirectorio.Autocompletar =function (request, response) 
    {
		rapazz.indexedDB.autoCompletar(request,response)
    }
//window.addEventListener("DOMContentLoaded", rapazz.miDirectorio.obtenerInformacion(), false)b