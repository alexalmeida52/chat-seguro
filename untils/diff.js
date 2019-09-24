const JSBI = require('jsbi')


module.exports = {
        init: (value) => {
                const b = JSBI.BigInt('3')

                const valor = JSBI.BigInt(value)
                const q = JSBI.BigInt('353')

                const result = JSBI.exponentiate(b, valor);
                const res = JSBI.remainder(result, q)

                return res.toString();
        },
        afterInit: (ya, yb) => {
                const b = JSBI.BigInt(yb);
                const a = JSBI.BigInt(ya);

                const q = JSBI.BigInt('353')

                const result = JSBI.exponentiate(b, a);
                const res = JSBI.remainder(result, q)

                return res.toString();
        },
        converterParaBinario: (bin) => {
                if (Number(bin).toString(2).length < 10) {
                        let menBin = Number(bin).toString(2);

                        for (j = Number(bin).toString(2).length; j < 10; j++) {

                                menBin = 0 + "" + menBin;
                        }
                        return menBin;
                }
                return Number(bin).toString(2)
        }

}