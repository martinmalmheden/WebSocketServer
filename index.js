/*import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });*/


const Fs = require('fs');
const Https = require('https');
const WebSocketServer = require('ws').Server;
const httpsServer = Https.createServer({
    key: Fs.readFileSync('key.pem'),
    cert: Fs.readFileSync('cert.pem')
  });

  const wss = new WebSocketServer({
    server: httpsServer
  });
  
  httpsServer.on('request', (req, res) => {
    res.writeHead(200);
    res.end('hello HTTPS world\n');
  });

let multiplier = 100;
wss.on('connection', function connection(ws) {

    const useInterval = (m) => {

        if(ws){
            const multiplier = 100;
            const rand1 = Math.random()*10+350;
            const t = Number(new Date((Date.now())));
            const val1 = rand1 + Number(m);
            const val2 = rand1 + Number(m)-250;
            const data= t/1000+',0,0,' + val1 +',0,0,0,' + val2;
            ws.send(data);
            //console.log(data)
        }
    };

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    let message = JSON.parse(data);
    multiplier = message.multiplier;
  });


  ws.send('something');
  setInterval(() => useInterval(multiplier), 1000)
});


