'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */
 
var conn = null;

function wsStart() {

	var token = window.getCookie("session");

	if ( token === "" ) {

		//no session 
		setTimeout(function () {

			wsStart();

		}, 1000);
	}
	else {

		conn = new WebSocket(window.websocketURL);

		conn.onopen = function () {

			setTimeout(function () {
				
				Session.identify();

			}, 1000);
		};

		conn.onclose = function (e) {

			console.log('WS Closed! reconnecting in 5...');
			setTimeout(function () {
				
				location.reload();

			}, 5000);
		};

		conn.onerror = function (e) {
			
			//console.log(e);
		};

		conn.onmessage = function(e) {

			if ( Session.getToken() === "" ) {
				
				return;
			}
		
			var firstSpace = e.data.search(" ");

			if ( firstSpace > 0 ) {

				var type = e.data.substr(0, firstSpace);
				var message = e.data.substr(firstSpace + 1);

				switch ( type ) {
					
					case "prediction":
					
						message = message.substr(1).replace(']', '').split(', ');

						if ( message[3] === '-1' ) {
							
							window.Materialize.toast("Nueva prediccion: " + message[1] + " a las " + message[2] + " hrs. ➡ Mal", 8000, 'rounded red');
						}
						else if ( message[3] === '1' ) {
							
							window.Materialize.toast("Nueva prediccion: " + message[1] + " a las " + message[2] + " hrs. ➡ Bien", 8000, 'rounded green');
						}
						else {

							window.Materialize.toast("Unexpected prediccion: " + message, 8000, 'rounded pink');
						}

						if ( location.hash === '#!/predictions' ) {

							//window.reloadData();
							window.actualizeValue(message[0], message[2], message[3]);
						}

						break;
					
					case "notification":
						window.Materialize.toast(message, 8000, 'rounded green');
						break;
						
					case "update":
						window.Materialize.toast(message, 8000, 'rounded blue');
						break;

					case "session":
						Session.update(message.trim());
						break;

					case "identify":

						console.log("Someone is identifying.");

						if ( location.hash === '#!/predictions' && message === 'update-table-forced' ) {

							window.reloadData();
						}

						if ( location.hash === '#!/activityLog' ) {

							window.updateSessionTable();
						}

						break;

					default:
						console.log("unknown message type received: " + message);
				}
			}
		};
	}
}

window.onload = function () {

	wsStart();

	document.getElementsByTagName('title')[0].innerHTML = window.appTitle;

	/*if ( location.protocol !== 'http:' ) {

		location.href = 'http:' + window.location.href.substring( window.location.protocol.length );
		return;
	}*/

	window.enableAnimations = window.getCookie('enableAnimations') !== '';
	window.enableCarouselView = window.getCookie('enableCarouselView') !== '';

	var n;

	n = window.getCookie('prediction_interval');

	if ( n != '' ) {

		n = parseInt(n);
		
		if ( !isNaN(n) ) {
			
			window.predictionInterval = n;
		}
	}

	n = parseInt(window.getCookie('devcounter'));

	if ( n != '' ) {

		n = parseInt(n);
		
		if ( !isNaN(n) ) {
			
			window.devcounter = n;
		}
	}

	n = window.getCookie('webstaticURL');

	if ( n !== '' ) {
		
		window.webstaticURL = n;
	}

	n = window.getCookie('webserviceURL');

	if ( n !== '' ) {
		
		window.webserviceURL = n;
	}

	/*var xhr;
	xhr = new XMLHttpRequest();
	xhr.onload = function() {

		var n = this.responseText;

		if ( n != '' ) {

			n = parseInt(n);
			
			if ( !isNaN(n) ) {
				
				window.predictionInterval = n;
			}
		}
	};
	xhr.open('GET', webserviceURL + '/dev/var/get.php?variable=PREDICCION_INTERVALO', true);
	xhr.send();
	*/
	console.log("Everything OK");
};
