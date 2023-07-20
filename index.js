import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

    const useInterval = () => {

        if(ws){
            const multiplier = 450;
            const rand1 = Math.random()*10+350;
            const t = Number(new Date((Date.now())));
            const val1 = rand1 + Number(multiplier);
            const val2 = rand1 + Number(multiplier)-250;
            const data= t/1000+',0,0,' + val1 +',0,0,0,' + val2;
            ws.send(data);
            //console.log(data)
        }
    };

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });


  ws.send('something');
  setInterval(useInterval, 1000)
});


