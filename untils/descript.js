 module.exports = async (res, k1, k2) => {
    let ip = [2, 6, 3, 1, 4, 8, 5, 7];
    let ipFinal = [4, 1, 3, 5, 7, 2, 8, 6];

    var S0 = [[1, 0, 3, 2], [3, 2, 1, 0], [0, 2, 1, 3], [3, 1, 3, 2]];
    // var S1 = [[1, 1, 2, 3], [2, 0, 1, 3], [3, 0, 1, 0], [2, 1, 0, 3]];
    var S1 = [[0, 1, 2, 3], [2, 0, 1, 3], [3, 0, 1, 0], [2, 1, 0, 3]];

    let mensagemEnviada = '';
    let mensagemrecebida = '';
    let kk =0;
    for (let i = 0; i < res.length/8; i++) {
        // console.log("Encriptando a letra " + res[i])
        mensagemrecebida += await descriptografar(res.substring(kk, kk+8));
        kk+=8;

    }
    // console.log('Enviada ' + mensagemEnviada);
    // console.log('Recebida ' + mensagemrecebida);
    // console.log(convertBinToDEC(mensagemrecebida));
    return convertBinToDEC(mensagemrecebida);
    // console.log("Recebida " + mensagemrecebida);

    function convertBinToDEC(message) {        
        let mensagemDes = '';
        let x = 0;
        for (let k = 0; k < message.length / 8; k++) {
            mensagemDes += String.fromCharCode(parseInt(Number(message.substring(x, x + 8)), 2));
            x += 8;
        }
        return mensagemDes;
    }
    function P(binary, ip) {
        let saida = '';
        for (let index = 0; index < 8; index++) {
            saida += binary[ip[index] - 1];
        }
        return saida;
    }

    function EP(sideRigh) {
        let ep = [4, 1, 2, 3, 2, 3, 4, 1];
        let saida = '';
        for (let index = 0; index < 8; index++) {
            saida += sideRigh[ep[index] - 1];
        }
        return saida;
    }

    function exclusive(right, key) {
        let saida = '';
        for (i in right) {
            if (Number(right[i]) == Number(key[i])) {
                saida += 0;
            } else {
                saida += 1;
            }
        }
        return saida;
    }

    function concatArray(array1, array2) {
        return array1.concat(array2);
    }

    function P4(binary) {
        let ip = [2, 4, 3, 1];
        let saida = '';
        for (let index = 0; index < 4; index++) {
            saida += binary[ip[index] - 1];
        }
        return saida;
    }


    async function encriptar(messageBinary, key) {

        // console.log(outIP);

        let left = messageBinary.substr(0, 4);
        let right = messageBinary.substr(4, 7);
        // console.log("Lados separados: \n" + left + " ----- " + right);
        // console.log(left + " <=> " + right);
        // console.log("Right: "+right+"\nEP: \n"+""+k1+"\n"+EP(right));
        // console.log(exclusive(EP(right)));
        // Saída do Ou exclusivo
        let exclusiveExRight = exclusive(EP(right), key); // exclusive(EP(right) -> Saída do expanssor.
        // console.log("Saída do expansor: \n" + EP(right));
        // console.log("Ou exclusivo: \n" + exclusiveExRight);


        let left2 = exclusiveExRight.substr(0, 4);
        let right2 = exclusiveExRight.substr(4, 7);
        // console.log("Lados separados: \n" + left2 + " ----- " + right2);


        let row = parseInt(Number(left2[0] + "" + left2[3]), 2);
        let col = parseInt(Number(left2[1] + "" + left2[2]), 2);

        let rowRight = parseInt(Number(right2[0] + "" + right2[3]), 2);
        let colRight = parseInt(Number(right2[1] + "" + right2[2]), 2);



        // TODO verificar se a linha e a colula estão corretas

        let sbox1 = S0[row][col];
        let sbox2 = S1[rowRight][colRight];
        // console.log("sboxOne " + sbox1)

        // console.log("sboxTwo " + sbox2)


        let sbox1Bin = (sbox1).toString(2);
        let sbox2Bin = (sbox2).toString(2);



        for (let kk = sbox1Bin.length; kk < 2; kk++) {
            sbox1Bin = 0 + "" + sbox1Bin;
        }
        for (let kk = sbox2Bin.length; kk < 2; kk++) {
            sbox2Bin = 0 + "" + sbox2Bin;
        }
        // console.log("sboxOneBin " + sbox1Bin)

        // console.log("sboxTwoBin " + sbox2Bin)

        let inputP4 = concatArray(sbox1Bin, sbox2Bin);
        // console.log("Juntando os lados: \n" + concatArray(sbox1Bin, sbox2Bin));

        let outputP4 = P4(inputP4);
        // console.log("Saida do P4: \n" + outputP4);
        let outputXOR = exclusive(outputP4, left)
        // console.log("Ou exclusivo com o lado esquerdo inicial: \n" + outputXOR);


        let result = concatArray(outputXOR, right);
        // console.log('Concatenando lado direito com a saida do xor:\n' + outputXOR + '----' + right + '\n' + result)
        // console.log(result);
        return result;


    }

    async function descriptografar(messageBinary) {
        return new Promise(async (resolve, reject) => {
            // console.log("Desc: " + messageBinary);
            // console.log("Permutação inicial P8: \n" + P(messageBinary, ip))
            let outIP = await P(messageBinary, ip);
            let round1 = await encriptar(outIP, k2);
            let left = round1.substr(0, 4);
            let right = round1.substr(4, 7);
            round1 = concatArray(right, left);

            let round2 = await encriptar(round1, k1);

            let mensagemDesriptografada = P(round2, ipFinal);


            resolve(mensagemDesriptografada);
        });

    }

}


