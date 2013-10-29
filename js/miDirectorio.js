//Objeto que maneja el directorio de contactos



 rapazz.miDirectorio ={} ;



rapazz.miDirectorio.obtenerInformacion = function (){

var blnBuscar =false 


  if (!localStorage["ultimoRegistro"] || datediff(localStorage["ultimoRegistro"],new Date(),'days') > constantes.diasActualizar)
 	blnBuscar=true

 if (blnBuscar){
registrosActualizados=false 
 	rapazz.indexedDB.deleteAll()

  continuar =true 
var objDirectorio=[]
 $.ajax({
    url:constantes.servicioGoogle ,
    type:'GET',
    dataType:'JSONP',
    jsonpCallback:'jsonp',
    success: function(data){
     var  objDirectorio= data;
for (var x=0;x<objDirectorio.length;x++){
     objDirectorio[x].timeStamp= new Date().getTime()
 objDirectorio[x].nombreApellido = []
objDirectorio[x].nombreApellido=[objDirectorio[x].nombre,objDirectorio[x].apellido]

}

rapazz.indexedDB.addAllContactos(objDirectorio)

  if (registrosActualizados){
  localStorage["ultimoRegistro"]= obtenerfecha()
var opt = {
  type: "basic",
  title: "Directorio Komatsu Cummins",
  message: "Directorio Actualizado, se dispone de " + x + " registros",
  iconUrl: ""
          }
chrome.notifications.clear('id1',function() {})
chrome.notifications.create('id1', opt,function() {});
                          }



}
})

}
return registrosActualizados
}
rapazz.miDirectorio.Autocompletar =function (request, response) 
    {
		rapazz.indexedDB.autoCompletar(request,response)
    }



rapazz.miDirectorio.listarRegistros = function(ui)  
{


  

 var tds=  '' 
        $("#tblResultados tr").remove();
if (ui.length>0){
tds = '<tr><td>Nombre</td><td>Organizacion</td><td>Correo</td><td>Anexo</td><td>Opciones</td></tr>'
$("#tblResultados").append(tds); 
}
 for (var x=0;x<ui.length;x++){ 
  console.log('acceso a listarRegistros ' + x );
  tds =  '<tr><td><a href="#"  id="link~' + x + '">' + ui[x].person.nombreCompleto + '</a></td><td>' + ui[x].person.compania +'</td><td>' + ui[x].person.email.split('.test')[0] + '</td><td>' +ui[x].person.anexo.split('EXT.')[1] +'</td><td> <button type="submit" class="btn btn-info" id="btnllamar~'+ x + '">Llamar</button></td></tr>'
$("#tblResultados").append(tds); 
document.getElementById ('btnllamar~'+ x).miAnexo= ui[x].person.anexo.split('EXT.')[1]
document.getElementById ('btnllamar~'+ x).addEventListener("click",  function(){
  cargarPopup(this.miAnexo)

},false);

document.getElementById ('link~'+ x).addEventListener("click",  function(){
 {cargaFichaUsuario(this.miEmail)}

},false);
document.getElementById ('link~'+ x).miEmail=ui[x].person.email.split('.test')[0] 

}
}
 


//window.addEventListener("DOMContentLoaded", rapazz.miDirectorio.obtenerInformacion(), false)