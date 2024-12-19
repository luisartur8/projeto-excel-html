const convertToFloatNumber = (value) => {
    if (typeof value !== 'string') return value;

    if (value.indexOf('R$') !== -1) value = value.replace('R$', '');

    value = String(value).trim();
    if (value.indexOf('.') !== -1 && value.indexOf(',') !== -1) {
        if (value.indexOf('.') < value.indexOf(',')) {
            value = value.replace(/\./g, '');
            
            return parseFloat(value.replace(/\,/g,'.'));
        } else {
            return parseFloat(value.replace(/,/gi,''));
        }
    } else if (value.indexOf(',') !== -1 && value.indexOf('.') === -1) {
        return parseFloat(value.replace(/,/gi,'.'));
    } else if (value.indexOf(',') === -1 && value.indexOf('.') !== -1) {
        return parseFloat(value)
    } else {
        return parseFloat(value) / 100;
    }
}

const numberPadEnd = (value) => {
    if (typeof value === 'string' && !isNaN(Number(value))) {
        if (value.includes('.')) {
            let parts = value.split('.');
            if (parts[1].length === 2) {
                return value;
            } else {
                return parts[0] + '.' + parts[1].padEnd(2, '0');
            }
        } else {
            return `${value}.00`;
        }
    }
    
    return value
}

const formatStringNumber = (value) => {
    if (!value) return String(0)
    
    value = convertToFloatNumber(value)
    value = numberPadEnd(value)

    return String(value)
}

const formatPurchase = (value) => {
    return formatStringNumber(value)
}