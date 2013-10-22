
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
	 var v = 10;
  var request = indexedDB.open( constantes.BD.Nombre,v);  //de manera asincrona

  request.onsuccess = function(e) {
   
    rapazz.indexedDB.db = e.target.result;
    var db = rapazz.indexedDB.db;
    // Pobla Base de datos 
rapazz.miDirectorio.obtenerInformacion();  


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
tablaDatos.createIndex("nombreCompleto", "nombreCompleto", { unique: false });

                   
                        };

  request.onerror = rapazz.indexedDB.onerror;
};

rapazz.indexedDB.addContacto = function(jsoncontacto) {
  var db = rapazz.indexedDB.db;
  var trans = db.transaction([constantes.BD.nombreTabla], "readwrite");
  var store = trans.objectStore(constantes.BD.nombreTabla);

  
    jsoncontacto.timeStamp= new Date().getTime()
 

  var request = store.put(jsoncontacto);

  request.onsuccess = function(e) {
   console.log("Registro Insertado: ", e);
  };

  request.onerror = function(e) {
    console.log("Error Adding: ", e);
  };
};

rapazz.indexedDB.deleteAll = function() {
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

rapazz.indexedDB.autoCompletar =  function(request, response) {

      console.log("Going to look for "+request.term);

    
 var db = rapazz.indexedDB.db;
      var transaction = db.transaction([constantes.BD.nombreTabla], "readonly");
      var result = [];

      transaction.oncomplete = function(event) {
        response(result);
      };

      // TODO: Handle the error and return to it jQuery UI
      var objectStore = transaction.objectStore(constantes.BD.nombreTabla);

      // Credit: http://stackoverflow.com/a/8961462/52160
      var range = IDBKeyRange.bound(request.term, request.term + "z");
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
 
window.addEventListener("DOMContentLoaded", rapazz.indexedDB.open(), false)