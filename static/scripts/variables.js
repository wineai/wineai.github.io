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
var feika = '/dev/test';	// for prediction shenanigans
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
var websocketURL = 'ws://winesocket.ddns.net:8080';
var webstaticURL = "http://wineviewer.ddns.net/static";
var webserviceURL = "http://wineservice.ddns.net:8081/BackEnd";
var predictionInterval = 1000*60*60*12;
var enableAnimations = false;
var enableCarouselView = false;
