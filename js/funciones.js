
function cargaFichaUsuario(correo) {

 
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
var noRegistrado ='No registrado'
 imagen = imagen.replace(/\-/g,'+')
 imagen = imagen.replace(/\*/g,'=')
  $("#fichaUsuario").empty()
  $("#nombreusuario").text(objcontactos[0].nombre)
 cuerpo += '<img src="data:image/jpeg;base64,'+imagen +' alt="..."> </a>'
   cuerpo +=' <div class="media-body">'
      cuerpo +=   '<strong> Cargo : </strong> '+ objcontactos[0].cargo+'<br>' 
      cuerpo +=   '<strong> Email : </strong><a  target="_blank"  href="https://mail.google.com/mail/?view=cm&fs=1&to=' + objcontactos[0].email + '" >' + objcontactos[0].email + '</a> <br>' 
        cuerpo +=  '<strong>Filial : </strong>' + objcontactos[0].compania  +'<br>'
        
         cuerpo +=  ' <strong>Direccion:</strong> '+ ((objcontactos[0].direccion==null)? noRegistrado :objcontactos[0].direccion)+'<br>'
         cuerpo +=  '<strong>Fijo:</strong> ' + ((objcontactos[0].anexo=='')? noRegistrado :objcontactos[0].anexo)
        cuerpo +=    '<strong> Movil:</strong> '+ ((objcontactos[0].movil==null)? noRegistrado :objcontactos[0].movil) +'<br>'
        // cuerpo +=   '<strong>Jefe Directo:</strong> {Jefe}<br>'
      cuerpo +=  '</div></div>' 
$('#myModal').modal({show:true})

      $("#fichaUsuario").prepend(cuerpo);  
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
    url: constantes.servicioWebdialer + anexo,
    height: 200,
    width: 300,
    type: "popup"}

chrome.windows.create(props, function(windowObj){
    console.log("Here's the window object.");
    console.dir(windowObj);
});

}




function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}


function datediff(fromDate,toDate,interval) { 
                /*
                 * DateFormat month/day/year hh:mm:ss
                 * ex.
                 * datediff('01/01/2011 12:00:00','01/01/2011 13:30:00','seconds');
                 */
                var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7; 
                fromDate = new Date(fromDate); 
                toDate = new Date(toDate); 
                var timediff = toDate - fromDate; 
                if (isNaN(timediff)) return NaN; 
                switch (interval) { 
                    case "years": return toDate.getFullYear() - fromDate.getFullYear(); 
                    case "months": return ( 
                        ( toDate.getFullYear() * 12 + toDate.getMonth() ) 
                        - 
                        ( fromDate.getFullYear() * 12 + fromDate.getMonth() ) 
                    ); 
                    case "weeks"  : return Math.floor(timediff / week); 
                    case "days"   : return Math.floor(timediff / day);  
                    case "hours"  : return Math.floor(timediff / hour);  
                    case "minutes": return Math.floor(timediff / minute); 
                    case "seconds": return Math.floor(timediff / second); 
                    default: return undefined; 
                } 
            }
            
function obtenerfecha(){
 var dateStr ="";
 dateObj = new Date();
var dd = dateObj.getDate();
  var mm = dateObj.getMonth()+1; //January is 0!
  var yyyy = dateObj.getFullYear();

  if(dd<10){dd='0'+dd}; 
  if(mm<10){mm='0'+mm};
  dateStr = ''+yyyy+mm+dd;
  dateStr = ''+ mm +  '/' +dd+'/' + yyyy;
  
  return dateStr
  
}

function remover_acentos(str) {
for (var i=0;i<str.length;i++){ 
//Sustituye "á é í ó ú" 
if (str.charAt(i)=="á") str = str.replace(/á/,"a"); 
if (str.charAt(i)=="é") str = str.replace(/é/,"e"); 
if (str.charAt(i)=="í") str = str.replace(/í/,"i"); 
if (str.charAt(i)=="ó") str = str.replace(/ó/,"o"); 
if (str.charAt(i)=="ú") str = str.replace(/ú/,"u"); 
} 
return str; 
} 
