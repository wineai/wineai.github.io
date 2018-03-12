
	function getParameters() {

		var result = {};
		var tmp = [];

		var items = location.search.substr(1).split("&");

		for (var index = 0; index < items.length; index++) {

			tmp = items[index].split("=");

			result[ tmp[0] ] = decodeURIComponent(tmp[1]);
		}

		return result;
	}

	function allResponse() {

		document.getElementById("title").innerHTML = "Se han desactivado todas las notificaciones";
		document.getElementById("content").innerHTML = 'Ya no recibira correos electronicos cuando ocurran nuevas predicciones.<br>Para reactivar, solo debe marcar <i class="material-icons" style="vertical-align:middle;height:27px;">email</i> en la <a href="./#!/predictions">Tabla de Predicciones</a>.';
	}

	function singleResponse(fermentationID, fermentationName) {

		document.getElementById("title").innerHTML = "Se han desactivado las notificaciones<br>para la fermentacion: " + fermentationName;
		document.getElementById("content").innerHTML = 'Ya no recibira correos electronicos cuando ' + fermentationName + ' tenga nuevas predicciones.<br>Para cancelar todas las notificaciones <button onclick="unsuscribeAll();">Click Aqui</button><br>Para reactivar esta y otras fermentaciones solo debe marcar <i class="material-icons" style="vertical-align:middle;height:27px;">email</i> en la <a href="./#!/predictions">Tabla de Predicciones</a>.';
	}

	function errorResponse() {
	
		document.getElementById("title").innerHTML = "Unexpected Error";
		document.getElementById("content").innerHTML = "There was a error while procesing your request<br>or the link you used may have expired.";
	}

	function unsuscribeAll() {
	
		location.href = location.href.substr(0, location.href.search("&target=")) + "&target=all";
	}
	
	window.onload = function () {

		//TODO
		//data must be validated via xhr
		//if key dont match add message "link expired"
	
		var data = getParameters();

		if ( data.email && data.key && data.target ) {
		
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", window.webserviceURL + "/query/unsubscribe.php?key=" + data.key + "&email=" + data.email + "&target=" + data.target + "&random=" + Math.random(), true);
			xhttp.onload = function() {

				if ( this.responseText !== '' ) {

					if ( data.target == 'all' ) {
					
						allResponse();
					}
					else {
					
						singleResponse(data.target, this.responseText);
					}

					var conn = new WebSocket(window.websocketURL);
					conn.onopen = function () {

						setTimeout(function () {

							conn.send('identify update-table-forced');

						}, 1000);
					};
					conn.onclose = function (e) {};
					conn.onerror = function (e) {};
					conn.onmessage = function (e) {};
				}
				else {
				
					errorResponse();
				}
			};
			xhttp.onerror = function () {
			
				errorResponse();
			};
			xhttp.send();
		}
	}
	