require( "console-stamp" )( console, {pattern : "yyyy-mm-dd HH:MM:ss.l", colors: {stamp: "green",label: "yellow"}} );  
var crypto = require('crypto');
var Client = require('node-xmpp-client');
var xmpp = require('node-xmpp-server');

//hostname = '192.168.1.6';
hostname = 'localhost';
username = 'user1';//received from server by dev_id
password = 'secret';

var client1 = new Client({
    jid: username+'@'+hostname,
    password: password,
    port:5222,
    host:hostname,
    preferredSaslMechanism: 'PLAIN'
  })





  client1.on('online', function () {
    console.log('client1: online')
        var message_id = crypto.randomBytes(10).toString('hex');
        var message_body = 'hi';
        var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"user2","from":"user1", "message" : "'+message_body+'"}, "message_id":"'+message_id+'", "message_type":"chat"}').up();
        client1.send(message);
        console.log(message.toString());
        console.log('message_sent to : client2');

  })

  client1.on('stanza', function (stanza) {
    console.log('RECEIVED :'+stanza.toString());
        var pcm_attrs = stanza.getChildText("pcm");
        var pcm_parse = JSON.parse(pcm_attrs);  
        var to = pcm_parse.data.to;    
        var from = pcm_parse.data.from;  
        var message_type = pcm_parse.message_type;
        var message_id = pcm_parse.message_id
        var message = pcm_parse.data.message;
        if(message_type == 'chat'){
            var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+to+'","from":"'+from+'", "message" : "'+message+'"}, "message_id":"'+message_id+'","message_type" : "ack"}').up();
            client1.send(message);
            console.log('ack sent successfully');
        }else if(message_type == 'group'){
            var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+username+'","from":"'+from+'", "message" : "'+message+'"}, "message_id":"'+message_id+'","message_type" : "ack"}').up();
            client1.send(message);        
            console.log('ack sent successfully');
        }    
     

  })

  client1.on('error', function (error) {
    console.log('client1', error)
  })

