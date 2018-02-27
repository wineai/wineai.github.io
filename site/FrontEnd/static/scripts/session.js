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

	self.user = '';
	self.token = '';

	self.timeout = 0;
	self.running = false;

	return {

		run : function () {

			if ( window.cristine ) {
				
				return;
			}

			clearTimeout(self.timeout);
		
			if ( self.token !== '' ) {

				window.$.ajax({

					url: window.webserviceURL + '/session/validate.php?token=' + self.token,
					success : function (response) {
						
						if ( response === '' ) {
							
							Session.destroy();
							Session.check();
							window.Materialize.toast('Su session ha expirado', 10000, 'rounded orange');
						}
					}
				});
			}

			self.timeout = setTimeout(function () {

				Session.run();

			}, 2000);
		},

		getUsername : function () {

			return self.user;
		},

		init: function (data) {

			data = new window.Identificable( data.split('|') );

			try {

				self.user = atob( data.name );
				self.token = data.id;

				window.setCookie('session', data.id + '|' + data.name );

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