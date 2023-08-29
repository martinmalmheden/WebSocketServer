import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let multiplier = 100;
wss.on('connection', function connection(ws) {
    console.log((new Date()).toLocaleDateString() + ' '+ (new Date()).toLocaleTimeString() + ' - Client connected')
    const useInterval = (m) => {
        let val2_old = 0;
        if(ws){
            const multiplier = 100;
            const rand1 = Math.random()*10+350;
            const rand2 = 2*Math.abs(Math.sin(Math.random()*5));
            
            const t = Number(new Date((Date.now())));
            const val1 = rand1 + Number(m);
            const val2 = rand1 + Number(m)-rand1*0.8+0.2*val2_old + rand2;
            const data= t/1000+',0,0,' + val1 +',0,0,0,' + val2;
            ws.send(data);
            val2_old = val2;
            //console.log((new Date()).toLocaleDateString() + ' '+ (new Date()).toLocaleTimeString() + ' ' + data)
        }
    };

  ws.on('message', function message(data) {
    //console.log('received: %s', data);
    let message = JSON.parse(data);

    if(message.multiplier)  {
        multiplier = message.multiplier;
    }
    if(message.action) {
        console.log(message);
    }
  });

  ws.on('close', () => {
    clearInterval(interval);
    console.log((new Date()).toLocaleDateString() + ' '+ (new Date()).toLocaleTimeString() + ' - Client disconnected')
  });

  let interval = setInterval(() => useInterval(multiplier), 100)
});


