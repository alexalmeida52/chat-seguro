module.exports = (chave) => {
    let vetorp10 = [];
    let K1 = [];
    let K2 = [];
    p10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
    p8 = [6, 3, 7, 4, 8, 5, 10, 9];
    left = [];
    right = [];
    
    let j = 5;
    // geração das subchaves
    // subchave K1
    // permutação de 10
    for (let i = 0; i < 10; i++) {
        vetorp10[i]= chave[p10[i] - 1];
    }

    
    // separação 
    for (let i = 0; i < 5; i++) {
        right[i] = vetorp10[i];
        left[i] = vetorp10[j];
        j++;
    }
    
    


    // rotação l1
    let a = right[0];
    let b = left[0];
    for (let i = 0; i < 4; i++) {
        right[i] = right[i + 1];
        left[i] = left[i + 1];
    }

    right[4] = a;
    left[4] = b;

    //junção do right e do left
    j = 5;
    for (let i = 0; i < 5; i++) {
        vetorp10[i] = right[i];
        vetorp10[j] = left[i];
        j++;
    }

    // permutação p8
    for (let i = 0; i < 8; i++) {
        K1[i] = vetorp10[p8[i] - 1];
    }

    // subchave K2
    //rotação l2
    for (let x = 0; x < 2; x++) {
        a = right[0];
        b = left[0];
        for (let i = 0; i < 5; i++) {
            right[i] = right[i + 1];
            left[i] = left[i + 1];
        }
        right[4] = a;
        left[4] = b;
    }
    //junção do right e do left
    j = 5;
    for (let i = 0; i < 5; i++) {
        vetorp10[i] = right[i];
        vetorp10[j] = left[i];
        j++;
    }
    // permutação p8
    for (let i = 0; i < 8; i++) {
        K2[i] = vetorp10[p8[i] - 1];
    }

    let K1String = '';
    let K2String = '';
    for(let i in K1){
        K1String += K1[i];
        K2String += K2[i];
    }
    return [K1String, K2String];

}


