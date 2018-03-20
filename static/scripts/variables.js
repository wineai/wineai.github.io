'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */

/* Dev */
var feika = '';	// for prediction shenanigans /dev/test
var zasshu = true;			// can't remember
var phantom = false;		// to use the old login system
var cristine = true;		// to disable the new session check
var devcounter = 0;
var devtabindex = null;


/* App */
var appTitle = 'WineAI';
var plotData = null;
var plotCache = null;
var plotColors = [
		'233,30,99',
		'0,150,136',
		'103, 58, 183',
		'255,62,31',
		'255, 152, 0',
		'7, 174, 21',
		'156, 39, 176'];
var plotInOnlyOneGraph = false;	// check if is still being used
var linkFromTheAbyss = null;	// cant remember purpose maybe link from prediction table
var enablePlotCaching = false;	// owo what dis 

/* Config */
var forceHTTPS = true;
var webstaticURL = 'https://wineai.github.io/static';
var websocketURL = 'wss://wineservice.ddns.net/WebSocket/';
var webserviceURL = 'https://wineservice.ddns.net/BackEnd';
var predictionInterval = 1000*60*60*12;
var enableAnimations = false;
var enableCarouselView = false;
