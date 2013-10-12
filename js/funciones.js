function cargaBusqueda(){
var tds
tds = '<tr><td>Nombre</td><td>Organizacion</td><td>Correo</td><td>anexo</td><td>opciones</td></tr>'
 for (var i = 0; i<=3; i++) 
	tds += '<tr><td>Moisés Bravo</td><td>KCC</td><td>moises.bravo@kcl.cl</td><td>58330</td><td><a data-toggle="modal" href="#myModal" class="btn btn-primary btn-lg">Ver</a></td></tr>'
 
$("#tblResultados").append(tds); 

}





function getContacts () {

var objcontactos=[]
 $.ajax({
    url:"https://script.google.com/a/macros/kcl.cl/s/AKfycby5jcOhLwcKrSnf3m9I_I3GWTgpwY6vJoq-vJ0AWVvuqK_nfRD4/exec?filtro="+$('#txtBuscar').val() + "&metodo=Nombre" ,
    type:'GET',
    dataType:'JSONP',
    jsonpCallback:'jsonp',
    success: function(data){
     var  objcontactos= data;
       var tds
        $("#tblResultados tr").remove();
tds = '<tr><td>Nombre</td><td>Organizacion</td><td>Correo</td><td>anexo</td><td>opciones</td></tr>'
for (var x=0;x<objcontactos.length;x++){
  tds += '<tr><td>' + objcontactos[x].nombre + '</td><td>' + objcontactos[x].compania +'</td><td>' + objcontactos[x].email.split('.test')[0] + '</td><td>' +objcontactos[x].anexo.split('ext.')[1] +'</td><td><button type="button" onclick="alert(1)" class="btn btn-info" id="btnVer~'+ x + '">Ver</button> <button type="submit" class="btn btn-info" id="btnllamar~'+ x + '">llamar</button></td></tr>'
 $("#tblResultados").append(tds); 
document.getElementById ('btnllamar~'+ x).miAnexo= objcontactos[x].anexo.split('ext.')[1]
document.getElementById ('btnllamar~'+ x).addEventListener("click",  function(){
  cargarPopup(this.miAnexo)

},false);
document.getElementById ('btnVer~'+ x).miEmail=objcontactos[x].email.split('.test')[0] 
document.getElementById ('btnVer~'+ x).addEventListener("click",  function(){cargaFichaUsuario(this.miEmail)},false);

}
}

  
});


   }



function cargaFichaUsuario(correo) {

$('#myModal').modal({show:true})
var objcontactos=[]
 $.ajax({
    url:"https://script.google.com/a/macros/kcl.cl/s/AKfycby5jcOhLwcKrSnf3m9I_I3GWTgpwY6vJoq-vJ0AWVvuqK_nfRD4/exec?filtro="+correo + "&metodo=getUser" ,
    type:'GET',
    dataType:'JSONP',
    jsonpCallback:'jsonp',
    success: function(data){
       objcontactos= data;

       var cuerpo='<div class="media"><a class="pull-left" href="#">'
 
//cuerpo += '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAABQCAIAAAB9HOxPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAN/SURBVHhe7ZvhccIwDEaZoBP0J8Oweqdggs6QllJaek0gsiRLsh/Hj95hy/bn95r4CIeFFwlMn8Bh+gQIgAQWNAACEkADGCCBBQ2AgATQAAZI4DMBzgZgQAJoAAMkwNUABkiAmyIYIIFLApwN4IAE0AAGJkjg/fX4815dLleDCSiYdYn39D82AQ1mZWTQdW+hjwaDbjjLuiWwB31uiuBlwARE6HM2GJCAaZfUhv7pdDqfz49D42wwLVQ1Ft6G/rXX/hWiwf6saNkpgT7o3y8GDTptLcM8TqA/+mgAkykSiEUfDVJAMOck8qCPBnMSGLbqnOijQRgQ8wycH300mIfGriuthT4adIVj7MHqoo8GY5Ppvrox0EcDd1DGG2A89NFgPEpdVtSMvstsPIvyLbJnugVrN6P/8xiP6GGeJAmhQZKNiJyGHv3I2VuMjQYWKRasAfqcDQpiazFl0N9KkauBBV+5a2joz70ys9mhgVmUqQqBvmg70EAUV+rGoN+8PWjQHF2KjqBvsg1oYBJj1yKgbx43GphH6lIQ9F1ivRVFA9d4VcVBXxWfpDMaSNLybwv6/hmvjIAGIbH/GRT0w/cADWK2APRjct8YFQ36bQfo98taOBIaCAMTNgd9YWAxzdHAPnfQt8/UuSIa2AQM+jY5BlVBg/bgVei/vSxf74q/1WqPLGtPNJDtjAn6VwG+37Lxae2SABo8j9UefTR4nnrXFmiwHrcG/ct9zj3oj//uut0Mtp4AGvzm0g99rgbJfJxdgxj00QANwhOIRx8NwiH4O4GJrgYa+gX3+vtPBdeWvBIkMLgGSdHnapAA/fspDKhBAfTRAA08EiiGPhp4QKCoWfhqUBh9NFAg69G1mAaDoI8GHiwrahbQYED00UCBrEfXpBoMjj4aeLCsqJlIg4nQRwMFsh5dgzWYFH008GBZUTNAA9Dn9wYKYl26dtIA9Dcfx3DZVorKEnDUAPR3PYkk2y9auyRgrAHo70Kfs4ELzO1FDTQAfTH6aNBOrEvPRg1AX4U+GrjA3F5UoIEGfdnPc6WP7Jdu37539DRL4IkGoG/2X3/LVbOtpFB7AisagL47+twUtRPr0vNXAyX9dCeBKgn8N+lbgyoLYJ4koE8ADY76EKlQPQE0QAMSOG5q8PlBdcWZPwnsSWD1iC343sDliE5REkiQABok2ASmEJ3AB2FbgKsaLi5MAAAAAElFTkSuQmCC" /> </a>'
 var imagen = objcontactos[0].foto.replace(/\_/g,'/')
 imagen = imagen.replace(/\-/g,'+')
 imagen = imagen.replace(/\*/g,'=')
 cuerpo += '<img src="data:image/jpeg;base64,'+imagen +' alt="..."> </a>'
   cuerpo +=' <div class="media-body">'
     cuerpo += '<h4 class="media-heading">Datos del Usuario</h4>'
      cuerpo +=' <strong>Nombre:</strong>'+ objcontactos[0].nombre +'<br>'
        cuerpo +=    '<strong>Filial:</strong>' + objcontactos[0].compania
         cuerpo +=   '<strong> Cargo:</strong> '+ objcontactos[0].cargo+'<br>' 
         cuerpo +=  ' <strong>Direccion:</strong> '+ objcontactos[0].direccion+'<br>'
         cuerpo +=  '<strong>Telefono:</strong> ' + objcontactos[0].anexo + '<br>'
        cuerpo +=    '<strong>Celular:</strong> '+ objcontactos[0].movil+'<br>'
        // cuerpo +=   '<strong>Jefe Directo:</strong> {Jefe}<br>'
      cuerpo +=  '</div></div>' 

      $("#fichaUsuario").append(cuerpo);  
                            }


  
});


   }


   function obtener(){
     url: "https://script.google.com/macros/s/AKfycbzZc91W2O_eHWOkhIJPt-wVX5N_lENnCYQ8HB9IAnBVh_4eWA/exec",
$( "#fichaUsuario" ).load( "url", function() {
  alert( "Load was performed." );
});

   }

   
function cargarPopup(anexo){
var props = {
    url: "https://10.201.123.4:8443/webdialer/Webdialer?destination=" + anexo,
    height: 200,
    width: 300,
    type: "popup"
}

chrome.windows.create(props, function(windowObj){
    console.log("Here's the window object.");
    console.dir(windowObj);
});

}


function replaceAll( text, busca, reemplaza ){
2
  while (text.toString().indexOf(busca) != -1)
3
      text = text.toString().replace(busca,reemplaza);
4
  return text;
5
}
