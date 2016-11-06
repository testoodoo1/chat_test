require( "console-stamp" )( console, {pattern : "yyyy-mm-dd HH:MM:ss.l", colors: {stamp: "green",label: "yellow"}} );  
var Client = require('node-xmpp-client');
var xmpp = require('node-xmpp-server');

var host = '192.168.1.16';
var username = 98769876;

var client1 = new Client({
    jid: username,
    password: 'secret',
    port: 5245,
    host: host,
    preferredSaslMechanism: 'PLAIN'
  });

  client1.on('online', function() {
  		console.log('Client1 Online');
          var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+rows[j].user_id+'","from":"pjtku5","action":"notify", "notify_count" : "10", "notify_data":'+notify_data+'}, "message_id":"test123","message_type" : "data"}').up();
          client1.send(message);
          console.log('message_sent to :'+rows[j].user_id);  		
  		
  });

  client1.on('stanza', function (stanza) {
    console.log('RECEIVED :'+stanza.toString());
  });

  client1.on('error', function (error) {
    console.log('client1', error)
  });