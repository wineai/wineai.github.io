'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */
 
window.onload = function () {

	var conn = new WebSocket(window.websocketURL);

	conn.onopen = function () {
		
		console.log("WebSocket open! now listening.");
	};

	conn.onmessage = function(e) {

		var firstSpace = e.data.search(" ");

		if ( firstSpace > 0 ) {

			var type = e.data.substr(0, firstSpace);
			var message = e.data.substr(firstSpace);

			switch ( type ) {
				
				case "notification":
					window.Materialize.toast(message, 8000, 'rounded green');
					break;

				case "session":
					Session.destroy();
					Session.check();
					window.Materialize.toast(message, 4000, 'rounded orange');
					break;
					
				default:
					console.log("unknown message type received: " + message);
			}
		}
	};


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

	var xhr;
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
	
	console.log("Everything OK");
};
