
var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key' : 'anonymous',
  'consumer_secret' : 'anonymous',
  'scope' : 'https://www.googleapis.com/auth/userinfo.email',
  'app_name' : 'Directorio Komatsu Cummins'
});

// Detectar si es primera ejecucion de la extension 

if (!localStorage["versionBD"] || localStorage["versionBD"] !=constantes.version ){

rapazz.indexedDB.open()


	localStorage["versionBD"] =constantes.version

	 oauth.authorize(function(){
	setTimeout(function() {

rapazz.miDirectorio.obtenerInformacion()

setInterval( function () {
rapazz.miDirectorio.obtenerInformacion()},360000)

	},70000)})

}
else 

oauth.authorize(function(){
	rapazz.miDirectorio.obtenerInformacion()

setInterval( function () {
	
rapazz.miDirectorio.obtenerInformacion()},360000)
 })




chrome.browserAction.setPopup({ 'popup':'main.html'})
/*

rapazz.indexedDB.open()
rapazz.miDirectorio.obtenerInformacion()

setInterval( function () {
rapazz.miDirectorio.obtenerInformacion()},360000)


chrome.browserAction.setPopup({ 'popup':'main.html'})


//setInterval(function(){alert(1)},7000);
*/

