require( "console-stamp" )( console, {pattern : "yyyy-mm-dd HH:MM:ss.l", colors: {stamp: "green",label: "yellow"}} );  
var crypto = require('crypto');
var Client = require('node-xmpp-client');
var xmpp = require('node-xmpp-server');
var DOMParser = require('xmldom').DOMParser;

//hostname = '192.168.1.6';
hostname = 'localhost';
username = 'user2';//received from server by dev_id
password = 'secret';

var client2 = new Client({
    jid: username+'@'+hostname,
    password: password,
    port:5222,
    host:hostname,
    preferredSaslMechanism: 'PLAIN'
  })





  client2.on('online', function () {
    console.log('client2: online')
    var message = '<message to="user1@localhost" type="chat" from="user2@localhost" xmlns:stream="http://etherx.jabber.org/streams"><body>no</body><active xmlns="http://jabber.org/protocol/chatstates"/></message>';
    client2.send(message);
/*        var message_id = crypto.randomBytes(10).toString('hex');
        var message_body = 'hi';
        var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"user1","from":"user2", "message" : "'+message_body+'"}, "message_id":"'+message_id+'", "message_type":"chat"}').up();
        client2.send(message);
        console.log(message.toString());
        console.log('message_sent to : client2');*/

  })

  client2.on('stanza', function (stanza) {
    console.log('RECEIVED :'+stanza.toString());
            var parser = new DOMParser();
            var xmlDoc = stanza.toString();
            var message_parse = parser.parseFromString(xmlDoc, "text/xml");
            var body = message_parse.getElementsByTagName("body")[0].childNodes[0].nodeValue;   
            var to = message_parse.getElementsByTagName("message")[0].getAttribute("to");
            var type = message_parse.getElementsByTagName("message")[0].getAttribute("type");
            var from = message_parse.getElementsByTagName("message")[0].getAttribute("from");
            var from = from.substr(0, from.indexOf('/')); 
            console.log(body, to, type, from); 
/*        if( type == 'chat'){
            var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+to+'","from":"'+from+'", "message" : "'+message+'"}, "message_id":"'+message_id+'","message_type" : "ack"}').up();
            client2.send(message);
            console.log('ack sent successfully');
        }else if(type == 'group'){
            var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+username+'","from":"'+from+'", "message" : "'+message+'"}, "message_id":"'+message_id+'","message_type" : "ack"}').up();
            client2.send(message);        
            console.log('ack sent successfully');
        }*/    
     

  })

  client2.on('error', function (error) {
    console.log('client2', error)
  })

