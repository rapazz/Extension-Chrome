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

rapazz.miDirectorio.listarRegistros = function(event, ui)  
{
  var x =0
 var tds=  '' 
        $("#tblResultados tr").remove();
tds = '<tr><td>Nombre</td><td>Organizacion</td><td>Correo</td><td>anexo</td><td>opciones</td></tr>'
  tds += '<tr><td>' + ui.nombreCompleto + '</td><td>' + ui.compania +'</td><td>' + ui.email.split('.test')[0] + '</td><td>' +ui.anexo.split('ext.')[1] +'</td><td><button type="button" onclick="alert(1)" class="btn btn-info" id="btnVer~'+ x + '">Ver</button> <button type="submit" class="btn btn-info" id="btnllamar~'+ x + '">llamar</button></td></tr>'
$("#tblResultados").append(tds); 
document.getElementById ('btnllamar~'+ x).miAnexo= ui.anexo.split('ext.')[1]
document.getElementById ('btnllamar~'+ x).addEventListener("click",  function(){
  cargarPopup(this.miAnexo)

},false);
document.getElementById ('btnVer~'+ x).miEmail=ui.email.split('.test')[0] 
document.getElementById ('btnVer~'+ x).addEventListener("click",  function(){cargaFichaUsuario(this.miEmail)},false);

}
 


//window.addEventListener("DOMContentLoaded", rapazz.miDirectorio.obtenerInformacion(), false)b