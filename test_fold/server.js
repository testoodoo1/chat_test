require( "console-stamp" )( console, {pattern : "yyyy-mm-dd HH:MM:ss.l", colors: {stamp: "green",label: "yellow"}} );  
require('events').EventEmitter.prototype._maxListeners = 100;
var xmpp = require('node-xmpp-server');
var connection = require('./db.js');
var clients = [];
var crypto = require('crypto');
//var domain = 'xmpp.projectk.oodoo.co.in';
//var domain = '192.168.1.6';
var domain = 'localhost';
var port = 5222;
var c2s = new xmpp.C2SServer({ 
    port: port,
    domain: domain
});

var mysql      = require('mysql2');
    var connect = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '1projectK!',
      database : 'chat',
    }); 

var mysql      = require('mysql2');
var mysqlModel = require('mysql-model');
    var appModel = mysqlModel.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '1projectK!',
      database : 'chat',
    }); 

var User = appModel.extend({
    tableName: "user_table",
});
var Message = appModel.extend({
    tableName: "message_table",
});
var Ack = appModel.extend({
    tableName: "ack_table",
}); 

/*test = new connection.first();

var now = test.find(2);

console.log(now);*/

// On Connect event. When a client connects.
c2s.on("connect", function(client) {

    c2s.on("register", function(opts, cb) {
        console.log("REGISTER");
    cb(false);
    });

    client.on('authenticate', function(opts, cb) {
    console.log("INTO AUTH : "+ opts);
        clients[opts.jid] = client; 
        if ('secret' == opts.password) {
            console.log("Auth Success");
            return cb(null, opts)
        }
        console.log('FAIL')
        cb(false)
    });



    client.on("online", function() {
            console.log("INTO ONLINE : "+ client.jid.user);
        connect.query('UPDATE user_table SET status = ? WHERE user_id = ?', ['online', client.jid.user], function(err, rows){
            if(err) throw err;
            console.log('Client', client.jid.user, 'ONLINE');
        });        
        client_user = client.jid.user+'@'+client.jid.domain;
        console.log('client_user : '+client_user);
        connect.prepare('SELECT message_id FROM message_table WHERE status = ? and to_user = ?',function(err, statement){
            statement.execute(['server_sent',client.jid.user], function(err, rows, columns) {
                   if(err) throw err;
                //console.log('rwo length: '+ rows.length);
                if(rows.length > 0){
                    for(var i=0; i < rows.length; i++){
                        var message_id_now = rows[i].message_id;
                        //console.log(message_id_now);
                        connect.execute('select * from message_table where message_id = ?',[message_id_now],function(err, rows){
                                var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+rows[0].from_user+'","from":"'+rows[0].to_user+'","message":"'+rows[0].message_body+'"}, "message_id":"'+rows[0].message_id+'","message_type" : "chat"}').up();
                                var client_new = clients[client_user]
                                client_new.send(message);
                                console.log(message.toString());
                        });
                    }
                }
            });
        });        
    });



    client.on("stanza", function(stanza) {
        console.log('stanza RECEIVED: ' +stanza.toString() );
            var pcm_attrs = stanza.getChildText("pcm");
            var pcm_parse = JSON.parse(pcm_attrs);  
            var to = pcm_parse.data.to.toLowerCase()+'@'+domain;     
            var from = pcm_parse.data.from;
            var message_type = pcm_parse.message_type;
            var message_id = pcm_parse.message_id;
            switch(message_type){
            case 'chat':
                var receiverClient = clients[to];
                if(receiverClient === undefined){
                    console.log('undefined : '+to);
                 } else {
                    console.log('defined : '+to);
                    var message_save = new connection.Message({
                        group_id : ' ',
                        from_user : pcm_parse.data.from,
                        to_user : pcm_parse.data.to,
                        message_id : message_id,
                        message_body : pcm_parse.data.message,
                        status : "server_sent"
                    });

                    message_save.save();
                    console.log('message added id : '+ message_id);

                    receiverClient.send(stanza);
                    console.log('Message sent to client - message_id :' + message_id); 
    // Do something after the sleep!

                }                                       
                
            break;
            case 'ack':
                connect.query('UPDATE message_table SET message_body = ?, status = ? WHERE message_id = ? and to_user = ?', ['','client_received', message_id, pcm_parse.data.to], function(err, rows){
                    if(err) throw err;
                    console.log(pcm_parse.data.to+'  ack updated to :'+ message_id);                    
                });
            break;
            case 'group':
                connect.query('SELECT group_user FROM group_table WHERE group_id = ?', pcm_parse.data.to, function(err, rows){
                    console.log(rows[0].group_user);
                        var group_user = JSON.parse(rows[0].group_user);
                        var grp_usr_len = Object.keys(group_user).length;
                        console.log(grp_usr_len);
                        for(var i = 0; i < grp_usr_len; i++){
                            var to = group_user[i]+'@'+domain;
                            var receiverClient = clients[to];
                            if(receiverClient === undefined){
                                console.log('undefined : '+to);
                            } else {
                                console.log('defined : '+to);
                                var message_save = new connection.Message({
                                    group_id : pcm_parse.data.to,
                                    from_user : pcm_parse.data.from,
                                    to_user : group_user[i],
                                    message_id : message_id,
                                    message_body : pcm_parse.data.message,
                                    status : "server_sent"
                                });
                                message_save.save();
                                console.log('message added id : '+ message_id);

                                receiverClient.send(stanza);
                                console.log('Message sent to client - message_id :' + message_id);                             
                            }
                        }
                });
            break;
        }
   });

    client.on("disconnect", function() {
       if(client.jid != undefined){ connect.query('UPDATE user_table SET status = ? WHERE user_id = ?', ['offline', client.jid.user], function(err, rows){
            if(err) throw err;
            console.log('Client', client.jid.user, 'OFFLINE');
        });
}
    });

});

var getClient = function (pcm_parse) {
   
    var clientLength = clients.length;
    console.log(clientLength);
    var client;
    var clientId;
    var to = pcm_parse.data.to;

    for(var i = 0; i < clientLength; i++){
        client = clients[i];
        console.log('here check:'+client.jid.user, client.jid.domain)
        console.log(to);
        clientId = client.jid.user+"@"+ client.jid.domain
        console.log(to.indexOf(clientId));
        if(to.indexOf(clientId) == 0){
           return client;
        }
    }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
