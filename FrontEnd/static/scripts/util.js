'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Global module of the application.
 */

jQuery.fn.sortDomElements = (function() {

    return function(comparator) {

        return Array.prototype.sort.call(this, comparator).each(function(i) {

              this.parentNode.appendChild(this);
        });
    };
})();

function drawComparativeChart(node, chartData) {

	/*CanvasJS.addColorSet("wanaina", [

		"#4661EE",
		"#EC5657",
		"#1BCDD1",
		"#8FAABB",
		"#B08BEB",
		"#3EA0DD",
		"#F5A52A",
		"#23BFAA",
		"#FAA586",
		"#EB8CC6"
	]);*/

	var chart = new CanvasJS.Chart(node, {

		//colorSet : "wanaina",
		exportEnabled: true,
		exportFileName: "WineAi - Empty Chart",
		animationEnabled: true,

		axisX: {

			gridColor : "#d4d4d4",
			gridThickness: 1,
			lineColor: "black",
			labelFontColor: "black",
			interval: 12,
			viewportMinimum: 0,
			viewportMaximum: chartData[chartData.length-1].x,
		},

		axisY: {

			gridColor : "#d4d4d4",
			gridThickness: 1,
			titleFontColor: "black",
			labelFontColor: "black",
			includeZero: false
		},

		toolTip: {

			shared: true
		},

		data: chartData
	});

	return chart;
}

function drawAndReturnChart(nodo, chemicalVariable, fermentation, animated, chartColor, chartData) {

	var chart = new CanvasJS.Chart(nodo, {

		exportEnabled: true,
		exportFileName: "WineAi - " + chemicalVariable + " de " + fermentation + " (" + chartData[0].x + " a " + chartData[chartData.length-1].x + " horas)",
		animationEnabled: animated,

		title: {

			text: chemicalVariable,
			fontFamily: "SharpGrotesk, Open Sans, sans-serif"
		},

		axisY: {

			gridColor : "#d4d4d4",
			gridThickness: 1
		},

		axisX: {

			interval: 12,
			gridColor : "#d4d4d4",
			gridThickness: 1,
			viewportMinimum: chartData[0].x,
			viewportMaximum: chartData[chartData.length-1].x,
		},

		data: [{

			color: chartColor,
			toolTipContent: "<b> " + chemicalVariable + " a la hora {x}</b>: {y}",
			indexLabelFontColor: "#333333",
			type: "area",
			dataPoints: chartData
		}]
	});

	return chart;
}

function drawChart(nodo, chemicalVariable, fermentation, animated, chartColor, chartData) {

	var chart = drawAndReturnChart(nodo, chemicalVariable, fermentation, animated, chartColor, chartData);

	if ( window.enableCarouselView ) {
	
		setTimeout(function () {
			
			chart.render();

		}, 100);
	}
	else {
		
		chart.render();
	}
}

var Identificable = function (data) {

	return {

		id : data[0],
		name : data[1]
	};
};
 
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

	avoidWarnings = Identificable;
	avoidWarnings = rng;
	avoidWarnings = formatTime;
	avoidWarnings = isOnMobile;
	avoidWarnings = setCookie;
	avoidWarnings = getCookie;
	avoidWarnings = avoidWarnings;
};