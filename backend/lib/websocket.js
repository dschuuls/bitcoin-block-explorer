var ws = require('ws');

const client = new ws('wss://ws.blockchain.info/inv');

client.on('open', () => {
  console.log('ws connected');
  client.send('{"op": "blocks_sub"}');
});

client.on('close', () => {
  console.log('ws disconnected');
});

client.on('message', (msg) => {
  console.log('ws msg: %s', msg);
});

client.on('error', (err) => {
  console.log('ws err: %s', err.message);
});
