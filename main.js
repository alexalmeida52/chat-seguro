const io = require('socket.io-client');
const socket = io.connect("http://10.51.67.140:5354");
const gerarChaves = require('./untils/gerarChaves.js')
const cript = require('./untils/cript.js');
const descript = require('./untils/descript.js');

console.log("Bem vindo ao chat seguro!\n");

const sendDiff = require('./untils/diff.js')
let control = 1;
let Yb;
let Ya;
let K1 = '';
let K2 = '';
if (control) console.log('Troca de chaves Diff Hellman')
socket.on('marcio', async (data) => {
    if (control == 2) {
        Yb = data;
        control = 3;

        let afterInit = sendDiff.afterInit(Ya, Yb);
        // console.log('Chave: ' + sendDiff.converterParaBinario(afterInit))
        let chaveBin = sendDiff.converterParaBinario(afterInit);
        K1 = gerarChaves(chaveBin)[0];
        K2 = gerarChaves(chaveBin)[1];
        console.log("Tudo ok. Pode começar a conversar.\n\n");
        readLine();

        return;
    }
    let mensagemDescriptografada = await descript(data, K1, K2);
    console.log("Alex: " + mensagemDescriptografada);
    readLine();
    // console.log("connected socket")
});

readLine();
function readLine() {
    var readline = require('readline');
    var resp = "";

    var leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    if (control == 1) console.log('Envie seu número ')
    leitor.question("Você > ", async function (answer) {
        Ya = answer;
        if (control == 1) {
            control = 2;
            ya = answer;
            socket.emit("alex", sendDiff.init(answer));
            console.log("Alex está digitando...")

            return;
        }
        let mensagemCriptografada = await cript(answer, K1, K2);
        socket.emit("alex", mensagemCriptografada);
        console.log("Alex está digitando...")

        leitor.close();
    });
}
