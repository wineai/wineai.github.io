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

	self.running = false;

	return {

		run : function () {

			window.wsStart();
			self.running = true;
		},

		update : function (token) {
		
			if ( token == self.token ) {

				Session.destroy();
				Session.check();
				window.Materialize.toast("Su session ha expirado", 4000, 'rounded orange');
				conn.close();
			}
		},
		
		getUserID : function () {
			
			return self.id;
		},
		
		getUsername : function () {

			return self.user;
		},

		identify : function () {
			
			conn.send("identify " + self.token);
		},
		
		init: function (data) {

			data = data.split('|');

			try {

				self.id = atob( data[2] );
				self.user = atob( data[1] );
				self.token = data[0];

				window.setCookie('session', self.token + '|' + data[1] + '|' + self.id, 14);

				if ( self.running == false ) {
					
					this.run();
				}

				return true;
			}
			catch (e) {
			}

			return false;
		},

		destroy : function () {

			self.user = '';
			self.token = '';

			window.setCookie('session', '', 7);
		},

		validate : function () {

			if ( (self.token + self.user) === '' ) {

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