//============== Importações de funções para o funcionamento do chat ==============//
const express = require('express');
const SocketProvider = require('./untils/io');
const sendDiff = require('./untils/diff.js')
const cript = require('./untils/cript.js');
const descript = require('./untils/descript.js');
const app = express();
const http = require('http').Server(app);
const io = SocketProvider.init(http);
const gerarChaves = require('./untils/gerarChaves.js')
const readline = require('readline');
//============== Fim das importações de funções do chat ==============//

//======= Variáveis globais =======//
var control = 1;
let Ya;
let Yb;
let K1 = '';
let K2 = '';
//======== Fim das variáveis globais ========//

//======= Inicio da configuração do socket =======//
console.log("Bem vindo ao chat Seguro!\n");
if (control) console.log('Troca de chaves Diff Hellman')
io.on('connection', function (socket) {
  // console.log('Connected');

  socket.on('alex', async function (data) {

    if (control == 1) {
      Yb = data;
    }
    // Desencriptando as mensagens que serão recebidas após a troca de chaves
    let mensagemDescriptografada = await descript(data, K1, K2);
    console.log("Marcio: " + mensagemDescriptografada);
    readLine(socket);
  });


});
//======= Fim da configuração do socket =======//

//======= Função para ler pelo terminal =======//
function readLine(socket) {

  let leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  if (control == 1) console.log('Envie seu número ')
  leitor.question("Você > ", async function (answer) {
    // Esse if serve para verificar se as mensagens são as iniciais para troca de chaves
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
    // Encriptando as mensagens que serão enviadas após a troca de chaves
    let mensagemCriptografada = await cript(answer, K1, K2);
    socket.emit("marcio", mensagemCriptografada);
    console.log("Marcio está digitando...")

    leitor.close();
  });
}
//======= Fim da função para ler pelo terminal =======//




// Capiturando erros.
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Fazendo o servidor ouvir a porta 5354
http.listen(5354, () => {
  // console.log(`Listening on server_port ${serverPort}`);
});
