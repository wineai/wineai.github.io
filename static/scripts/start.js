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

	if ( token != "" ) {

		if ( conn != null ) {
			
			conn.close();
		}
	
		conn = new WebSocket(window.websocketURL);

		conn.onopen = function () {

			setTimeout(function () {
				
				Session.identify();

			}, 1000);
		};

		conn.onmessage = function(e) {

			var firstSpace = e.data.search(" ");

			if ( firstSpace > 0 ) {

				var type = e.data.substr(0, firstSpace);
				var message = e.data.substr(firstSpace + 1);

				switch ( type ) {
					
					case "prediction":
					
						message = message.substr(1).replace(']', '').split(', ');

						if ( message[2] === '-1' ) {
							
							window.Materialize.toast("Nueva prediccion: " + message[0] + " a las " + message[1] + " hrs. ➡ Mal", 8000, 'rounded red');
						}
						else if ( message[2] === '1' ) {
							
							window.Materialize.toast("Nueva prediccion: " + message[0] + " a las " + message[1] + " hrs. ➡ Bien", 8000, 'rounded green');
						}
						else {

							window.Materialize.toast("Unexpected prediccion: " + message, 8000, 'rounded pink');
						}

						if ( location.hash === '#!/predictions' ) {

							window.reloadData();
						}

						break;
					
					case "notification":
						window.Materialize.toast(message, 8000, 'rounded green');
						break;
						
					case "update":
						window.Materialize.toast(message, 8000, 'rounded blue');
						break;

					case "session":
						Session.update(message);
						break;

					case "identify":
						/* Ignore */
						break;

					default:
						console.log("unknown message type received: " + message);
				}
			}
		};
	}
}

window.onload = function () {

	document.getElementsByTagName('title')[0].innerHTML = window.appTitle;

	if ( location.protocol !== 'http:' ) {

		location.href = 'http:' + window.location.href.substring( window.location.protocol.length );
		return;
	}

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
