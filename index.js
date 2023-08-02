import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let multiplier = 100;
wss.on('connection', function connection(ws) {
    console.log((new Date()).toLocaleDateString() + ' '+ (new Date()).toLocaleTimeString() + ' - Client connected')
    const useInterval = (m) => {

        if(ws){
            const multiplier = 100;
            const rand1 = Math.random()*10+350;
            const t = Number(new Date((Date.now())));
            const val1 = rand1 + Number(m);
            const val2 = rand1 + Number(m)-250;
            const data= t/1000+',0,0,' + val1 +',0,0,0,' + val2;
            ws.send(data);
            //console.log((new Date()).toLocaleDateString() + ' '+ (new Date()).toLocaleTimeString() + ' ' + data)
        }
    };

  ws.on('message', function message(data) {
    //console.log('received: %s', data);
    let message = JSON.parse(data);
    multiplier = message.multiplier;
  });

  ws.on('close', () => {
    clearInterval(interval);
    console.log((new Date()).toLocaleDateString() + ' '+ (new Date()).toLocaleTimeString() + ' - Client disconnected')
  });

  let interval = setInterval(() => useInterval(multiplier), 100)
});


