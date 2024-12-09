function arrumaFloat(valor) {
    // Excluir o que não for [0-9] (.) (,) (-)
    valor = valor.trim().replace(/[^0-9.,-]/g, '');

    // Não permite valores negativos
    if (valor.includes('-')) {
        return "";
    }

    // Permite apenas um ponto ou uma virgula, nunca os dois, com pelo menos um numero antes e depois
    if (!/^\d+([.,]\d+)?$/.test(valor) || (valor.match(/[.,]/g) || []).length > 1) {
        return "";
    }

    valor = valor.replace(',', '.');
    return (parseFloat(parseFloat(valor).toFixed(2))).toString();
}

function corrigirPercentual(percentual) {
    percentual = arrumaFloat(percentual);
    if (percentual === '') {
        return '';
    }
    return +percentual >= 0 && +percentual <= 100 ? percentual.replace('.', ',') : "";
}


function corrigirValidade(validade) {
    validade = arrumaFloat(validade);
    if (validade === '') {
        return '';
    }
    return +validade >= 0 ? parseFloat(validade).toFixed(2).replace('.', ',') : "";
}

console.log(corrigirPercentual('0'));
console.log(corrigirPercentual('-1'));
console.log(corrigirPercentual('1.2333'));
console.log(corrigirPercentual('1,2333'));
console.log(corrigirPercentual('1.23,33'));
console.log(corrigirPercentual('.12333'));
console.log(corrigirValidade('00012,009009'));
console.log(corrigirPercentual('99.999999'));