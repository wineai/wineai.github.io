'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Bla bla bla causality bla bla
 */

var Session = function (self) {

	self.id = '';
	self.user = '';
	self.token = '';

	return {

		destroy : function () {

			self.id = '';
			self.user = '';
			self.token = '';

			window.setCookie('session', '', 7);
		},

		update : function (token) {

			if ( token == self.token ) {

				Session.destroy();
				Session.check();

				window.Materialize.toast("Su session ha expirado", 4000, 'rounded orange');
			}
		},
		
		getUserID : function () {
			
			if (self.id) {
				
				return self.id;
			}
			
			try {

				return atob(window.getCookie('session').split('|')[2]);
			}
			catch (e) {}

			return '';
		},
		
		getToken : function () {
			
			return self.token;
		},
		
		getUsername : function () {

			return self.user;
		},

		identify : function () {

			window.$.ajax({

				url: window.webserviceURL + '/session/validate.php?token=' + self.token + '&random=' + Math.random(),
				success : function(response) {

					if ( response !== '' ) {

						conn.send("identify " + self.token);
					}
					else {
						
						Session.update( self.token );
					}
				}
			});
		},
		
		init: function (data) {

			data = data.split('|');

			try {

				self.id = atob( data[2] );
				self.user = atob( data[1] );
				self.token = data[0];

				window.setCookie('session', data[0] + '|' + data[1] + '|' + data[2], 14);

				return true;
			}
			catch (e) {
				console.log(e);
			}

			return false;
		},

		logout : function () {

			window.$.ajax({

				url: window.webserviceURL + '/session/logout-token.php?token=' + self.token + '&random=' + Math.random(),
				success : function(response) {

					Session.destroy();
					Session.check();
					window.conn.send('identify update-table');
				}
			});
		},

		validate : function () {

			if ( (self.token + self.user + self.id) === '' ) {

				var cookie = window.getCookie('session');

				if ( cookie !== '' ) {

					Session.destroy();
					Session.init(cookie);

					return Session.validate();
				}
			}
			else {

				return true;
			}

			return false;
		},

		check : function () {
			
			if ( !Session.validate() && location.hash.substr(3) !== 'login' ) {

				location.href = '#!/login';
			}
		}
	};
};

Session = new Session({});