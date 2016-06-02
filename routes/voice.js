'use strict';

var options        = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);

exports.voice = function(req, res) {
  console.log(req.body);

  var message = "Thank you for your response; the coctail will be on the 15th of this month. You're ";
  message += "welcome, goodbye!";

  var callerNumber = req.body.callerNumber; // return +88888888

  var response = '<Response><Play url="http://cpp.mw/~wiz/at/cocktail-demo-vo-export.wav"/></Response>';

	res.setHeader('Content-Type', 'text/plain');
	res.send( response );
};
