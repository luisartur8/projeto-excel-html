function convertToFloatNumber(value) {
    if (typeof value !== 'string') return value;

    if (value.indexOf('R$') !== -1) value = value.replace('R$', '');

    value = String(value).trim();
    if (value.indexOf('.') !== -1 && value.indexOf(',') !== -1) {
        if (value.indexOf('.') < value.indexOf(',')) {
            value = value.replace(/\./g, '');

            return parseFloat(value.replace(/\,/g, '.'));
        } else {
            return parseFloat(value.replace(/,/gi, ''));
        }
    } else if (value.indexOf(',') !== -1 && value.indexOf('.') === -1) {
        return parseFloat(value.replace(/,/gi, '.'));
    } else if (value.indexOf(',') === -1 && value.indexOf('.') !== -1) {
        return parseFloat(value)
    } else {
        return parseFloat(value);
    }
}

function arrumaValor(valor) {
    // Excluir o que não for [0-9] (.) (,) (-)
    valor = valor.trim().replace(/[^0-9.,-]/g, '');

    // Não permite valores negativos
    if (valor.includes('-')) {
        return "";
    }

    valor = convertToFloatNumber(valor);

    return ((parseFloat(valor).toFixed(2))).toString();
}

console.log(convertToFloatNumber('200.000,34'))
console.log(convertToFloatNumber(0.5))

console.log(arrumaValor('40'))