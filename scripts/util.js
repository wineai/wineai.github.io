'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */

function rng(min, max) {

	return Math.floor(Math.random()*(max-min+1)+min);
}

function isOnMobile() {

	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);//FIXME i know this is not include in the current project but may be usefull in PT2
}

function setCookie(cname, cvalue, exdays) {

    var d = new Date();

    d.setTime(d.getTime() + (exdays*24*60*60*1000));

    var expires = 'expires='+ d.toUTCString();

    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {

    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) {

        var c = ca[i];

        while (c.charAt(0) === ' ') {

            c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {

            return c.substring(name.length, c.length);
        }
    }

    return '';
}

function formatTime(s) {

	s = (s - (s % 1000)) / 1000;

	var secs = s % 60;

	s = (s - secs) / 60;

	var mins = s % 60;

	var hrs = (s - mins) / 60;

	return ((hrs<10)?'0':'') + hrs + ':' + ((mins<10)?'0':'') + mins + ':' + ((secs<10)?'0':'') + secs; 
}

var avoidWarnings = function () {

	avoidWarnings = rng;
	avoidWarnings = formatTime;
	avoidWarnings = isOnMobile;
	avoidWarnings = setCookie;
	avoidWarnings = getCookie;
	avoidWarnings = avoidWarnings;
};