const express = require('express');
const SocketProvider = require('./untils/io');
const sendDiff = require('./untils/diff.js')
const cript = require('./untils/cript.js');
const descript = require('./untils/descript.js');
const app = express();
const http = require('http').Server(app);
const io = SocketProvider.init(http);
var control = 1;
let Ya;
let Yb;
let K1 = '';
let K2 = '';
const gerarChaves = require('./untils/gerarChaves.js')
console.log("Bem vindo ao chat Seguro!\n");
if (control) console.log('Troca de chaves Diff Hellman')
io.on('connection', function (socket) {
  // console.log('Connected');

  socket.on('alex', async function (data) {

    if (control == 1) {
      Yb = data;
    }
    let mensagemDescriptografada = await descript(data, K1, K2);
    console.log("Marcio: " + mensagemDescriptografada);
    readLine(socket);
  });


});

function readLine(socket) {
  const readline = require('readline');

  let leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  if (control == 1) console.log('Envie seu número ')
  leitor.question("Você > ", async function (answer) {
    if (control ==1) {
      socket.emit("marcio", sendDiff.init(answer));
      console.log("Marcio está digitando...")

      Ya = answer;
      // console.log('Ya: ' + Ya + ' Yb: ' + Yb);
      let afterInit = sendDiff.afterInit(Ya, Yb);
      // console.log('After ' + afterInit)
      let chaveBin = sendDiff.converterParaBinario(afterInit);
      control = 2;
      K1 = gerarChaves(chaveBin)[0];
      K2 = gerarChaves(chaveBin)[1];
      return;
    }

    let mensagemCriptografada = await cript(answer, K1, K2);
    socket.emit("marcio", mensagemCriptografada);
    console.log("Marcio está digitando...")

    leitor.close();
  });
}



// Capiturando erros.
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const serverPort = process.env.PORT || 5354;

http.listen(5000, () => {
  // console.log(`Listening on server_port ${serverPort}`);
});
