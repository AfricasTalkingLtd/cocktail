'use strict';

var options = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);

var sms     = AfricasTalking.SMS;

var db = require('./../models');
var txt_message = "Thank you for confirming your attendance to The Pan-African Dream Cocktail. ";
txt_message += "We are looking forward to seeing you on the 15th of June on the 7th floor of Galana Plaza... ";
txt_message += "Let's Talk Africa";


exports.wiredUssd = function(req, res) {
  var message = "";

  var sessionId   = req.body.sessionId;
  var serviceCode = req.body.serviceCode;
  var phoneNumber = req.body.phoneNumber;
  var text 	      = req.body.text;

  var voice   = AfricasTalking.VOICE;

  console.log(sessionId, serviceCode, phoneNumber, text);

  var length = text.split('*').length;
  var txt = text.split('*');

  if (text === '') {
	 message = 'CON Welcome to The Pan-African Dream Cocktail\n';
	 message += 'Enter your name to RSVP \n';
  }

  // add a client
  else if (length === 1) {
    // check if user is agent
    message = 'END You have been registered, we will call you shortly';
    var opts = { 'to': phoneNumber, 'message': txt_message };

    sms.send(opts)
    .then(function(s) {
      console.log(s);
    })
    .catch(function (error) {
      console.log(error);
    });

    voice.call({
      'callFrom': '+254711082306',
      'callTo': phoneNumber
    })
    .then(function(s) {
      console.log(s);
    })
    .catch(function(error) {
      console.log(error);
    });

    var options = text.split('*');

    db.Client.create({
      'name': options[0],
      'phoneNumber': phoneNumber
    }).then(function(client) {
      console.log('client added', client);
    });
  }
  else {
	  message = 'END Wrong input';
    // reply with menu
  }

  res.contentType('text/plain');
  res.send(message, 200);
};
