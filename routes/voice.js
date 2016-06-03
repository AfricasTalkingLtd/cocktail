'use strict';

var options        = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
var db = require('./../models');

exports.voice = function(req, res) {
  var isActive  = req.body.isActive;

  if (isActive === '1') {

    console.log(req.body);

    var response = '<Response><Play url="http://cpp.mw/~wiz/at/cocktail-demo-vo-export.wav"/></Response>';

	  res.setHeader('Content-Type', 'text/plain');
	  res.send( response );
  } else {

    db.Voice.create({
      'durationInSeconds': req.body.durationInSeconds,
      'direction': req.body.direction,
      'amount': req.body.amount,
      'callerNumber': req.body.callerNumber,
      'destinationNumber': req.body.destinationNumber,
      'sessionId': req.body.sessionId,
      'callStartTime': req.body.callStartTime,
      'isActive': req.body.isActive,
      'currencyCode': req.body.currencyCode,
      'status': req.body.status

    }).then(function(voice) {
      console.log('client added', voice);
    });

  }
};
