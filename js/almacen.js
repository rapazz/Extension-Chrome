
 // archivo
//Definicion del Espacio de nombres
//var rapazz = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                   window.mozIndexedDB;

 window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
 window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

rapazz.indexedDB = {};
rapazz.indexedDB.db = null;
//Manejo de Errores Genericos
rapazz.indexedDB.onerror = function(e) {
  console.log(e);
};

//Intenta abrir la base de datos en caso contrario la crea
rapazz.indexedDB.open = function() {
	 var v =  constantes.version ;
  var request = indexedDB.open( constantes.BD.Nombre,v);  //de manera asincrona

  request.onsuccess = function(e) {
   
    rapazz.indexedDB.db = e.target.result;
    var db = rapazz.indexedDB.db;
    // Pobla Base de datos 
 


       // START chrome (obsolete - will be removed)
                                if (typeof db.setVersion === 'function') {
                                        var versionReq = db.setVersion(v);
                                        versionReq.onsuccess = function (e) {
                                                console.log('versionReq', e);
 
                                                rapazz.indexedDB.db = e.target.source; // instead of result
                                                var db = rapazz.indexedDB.db;
                                                console.log('db', db);
 
                                                if(!db.objectStoreNames.contains(constantes.BD.nombreTabla)){
                                                        db.createObjectStore(constantes.BD.nombreTabla, {keyPath: 'email', autoIncrement: false});
                                                }
                                        }
                                }
                                // END chrome
//rapazz.miDirectorio.obtenerInformacion();
                                  };


  request.onupgradeneeded = function(e) {
                                console.log('cambio estructura bd', e);
 
                                rapazz.indexedDB.db = e.target.result;
                                var db = rapazz.indexedDB.db;
                                console.log('db', db);
 
                                if(db.objectStoreNames.contains(constantes.BD.nombreTabla))
									db.deleteObjectStore(constantes.BD.nombreTabla)
                                	var tablaDatos = db.createObjectStore(constantes.BD.nombreTabla, {keyPath: 'email', autoIncrement: false});
tablaDatos.createIndex("email", "email", { unique: false });
//tablaDatos.createIndex("nombre", "nombre", { unique: false });
//tablaDatos.createIndex("apellido", "apellido", { unique: false });

tablaDatos.createIndex(constantes.BD.indice, "nombreApellido", { unique: false, multiEntry : true });
 localStorage["ultimoRegistro"]=""
rapazz.miDirectorio.obtenerInformacion(); 
                   
                        };

  request.onerror = rapazz.indexedDB.onerror;
};


rapazz.indexedDB.addAllContactos = function (jsoncontacto) {

var db = rapazz.indexedDB.db;
  var trans = db.transaction([constantes.BD.nombreTabla], "readwrite");
  var store = trans.objectStore(constantes.BD.nombreTabla);
var i=0;
  
 
 rapazz.indexedDB.addSiguiente(store,i,jsoncontacto)
}




rapazz.indexedDB.addSiguiente= function(store,i,json){

 if (i < json.length){
//console.log("Registro Insertado: ", i);
++i;
request = store.put(json[i-1])
request.onsuccess=rapazz.indexedDB.addSiguiente(store,i,json)
request.onerror = function (e){
  console.log('Registro con Problemas ' , e)
}

 }
else 
  registrosActualizados=true 

}
rapazz.indexedDB.addContacto = function(jsoncontacto) {
  var db = rapazz.indexedDB.db;
  var trans = db.transaction([constantes.BD.nombreTabla], "readwrite");
  var store = trans.objectStore(constantes.BD.nombreTabla);

  
    jsoncontacto.timeStamp= new Date().getTime()
 jsoncontacto.nombreApellido = []
jsoncontacto.nombreApellido=[jsoncontacto.nombre,jsoncontacto.apellido]

  var request = store.put(jsoncontacto);

  request.onsuccess = function(e) {
   console.log("Registro Insertado: ", e);
  };

  request.onerror = function(e) {
    console.log("Error Adding: ", e);
  };
};


rapazz.indexedDB.deleteAll = function() {
   var v =  constantes.version ;
  var req = indexedDB.open( constantes.BD.Nombre,v);  //de manera asincrona

  req.onsuccess = function(e) {
      rapazz.indexedDB.db = e.target.result;
  var db = rapazz.indexedDB.db;
  var trans = db.transaction([constantes.BD.nombreTabla], "readwrite");
  var store = trans.objectStore(constantes.BD.nombreTabla);

  var request = store.clear();

  request.onsuccess = function(e) {
  console.log("Todos los registros borrados: ", e);
return true  
  };

  request.onerror = function(e) {
    console.log("Error Agregando: ", e);
    return true 
  };
  return false 
};
};

rapazz.indexedDB.autoCompletar =  function(request, response) {


    var v =  constantes.version ;
  var req = indexedDB.open( constantes.BD.Nombre,v);  //de manera asincrona

  req.onsuccess = function(e) {
      rapazz.indexedDB.db = e.target.result;
 var db = rapazz.indexedDB.db;
      var transaction = db.transaction([constantes.BD.nombreTabla], "readonly");
      var result = [];

      transaction.oncomplete = function(event) {
        response(result);
      };

      // TODO: Handle the error and return to it jQuery UI
      var objectStore = transaction.objectStore(constantes.BD.nombreTabla);

      // Credit: http://stackoverflow.com/a/896 constantes.version 62/52160
      var range = IDBKeyRange.bound(request.term.toUpperCase(), request.term.toUpperCase() + "z");
      //var index = objectStore.index(constantes.BD.indice);
var index = objectStore.index(constantes.BD.indice);
 
      index.openCursor(range).onsuccess = function(event) {
        var cursor = event.target.result;
        if(cursor) {
          result.push({
            value: cursor.value.nombreCompleto,
            person: cursor.value
          });
          cursor.continue();
        }
      };
    }
 }
