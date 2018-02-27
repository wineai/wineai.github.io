'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */

var Identificable = function (data) {

	return {

		id : data[0],
		name : data[1]
	};
};

var plotData;
var plotCache;
var plotColors;

var devcounter;
var linkFromTheAbyss;
var enablePlotCaching;
var plotInOnlyOneGraph;
var enableCarouselView;
var predictionInterval;

var Webservice = function (self) {

	self.URL = '';
	self.blackboxURL = '';

	return {

		setURL : function (value) {
			
			self.URL = value;
		},
	
		getURL : function () {

			return  self.URL;
		},
		
		getBlackBoxPort : function () {

			return self.blackboxPort;
		},

		setBlackBoxPort : function (value) {

			self.blackboxPort = value;
		},
		
		getBlackBoxURL : function () {
			
			return self.blackboxURL;
		},

		setBlackBoxURL : function (value) {

			self.blackboxURL = value;
		}
	};
};

Webservice = new Webservice({});

var Session = function (self) {

	self.user = '';
	self.type = '';
	self.token = '';

	return {

		getUsername : function () {

			return self.user;
		},

		init: function (data) {

			data = new Identificable( data.split('|') );

			try {

				self.user = atob( data.name );
				self.type = 'admin';//FIXME for display certains modules
				self.token = atob( data.id );
				window.setCookie('session', data.id + '|' + data.name );

				return true;
			}
			catch (e) {
			}

			return false;
		},

		destroy : function () {//rename to destroy

			self.user = '';
			self.type = '';
			self.token = '';

			window.setCookie('session', '', 7);
		},

		validate : function () {

			//TODO validate from server
			if ( (self.token + self.type + self.user) === '' ) {

				var cookie = window.getCookie('session');

				if ( cookie !== '' ) {

					this.destroy();
					this.init(cookie);
					return this.validate();
				}
			}
			else {

				return true;
			}

			return false;
		},

		check : function () {
			
			if ( !this.validate() && location.hash.substr(3) !== 'login' ) {

				location.href = '#!/login';
			}
		}
	};
};

Session = new Session({});

window.onload = function () {

	plotData = null;
	plotCache = null;
	plotColors = [
		'233, 30, 99',
		'156, 39, 176',
		'103, 58, 183',
		'0, 150, 136',
		'255, 193, 7',
		'255, 106, 0'];

	devcounter = 0;
	linkFromTheAbyss = null;
	enablePlotCaching = false;
	plotInOnlyOneGraph = false;
	enableCarouselView = false;
	predictionInterval = 1000 * 60 * 60 * 12;

	var n;

	n = parseInt(window.getCookie('prediction_interval'));
	if ( !isNaN(n) ) {
		
		predictionInterval = n;
	}

	n = parseInt(window.getCookie('devcounter'));
	if ( !isNaN(n) ) {

		devcounter = n;
	}

	n = window.getCookie('blackboxURL');

	if ( n !== '' ) {
		
		Webservice.setBlackBoxURL(n);
	}
	else {

		Webservice.setBlackBoxURL('127.0.0.1');
	}

	n = window.getCookie('blackboxPort');

	if ( n !== '' ) {

		Webservice.setBlackBoxPort(n);
	}
	else {

		Webservice.setBlackBoxPort('8000');
	}
	
	n = window.getCookie('webserviceURL');

	if ( n !== '' ) {
		
		Webservice.setURL(n);
	}
	else {

		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {

			if ( this.responseText != "" ) {

				Webservice.setURL(this.responseText);
			}
			else {

				Webservice.setURL('BackEnd');
			}
		};
		xhttp.onerror = function() {

			Webservice.setURL('BackEnd/');
		};
		xhttp.open("GET", "BackEnd/var/WEBSERVICE_URL.htconfig", true);
		xhttp.send();
	}

	Session.check();
	document.getElementsByTagName('title')[0].innerHTML = 'WineAI Viewer';
};
