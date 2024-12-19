function corrigirData_nascimento(data_nascimento, formatoOrigem, formatoFinal = 'dd/mm/yyyy') {

    data_nascimento = data_nascimento.replace(/\D/g, '/'); // Tudo o que não é número vira barra

    const numeroBarras = (data_nascimento.match(/\//g) || []).length; // Quantidade de barras

    if (numeroBarras != 2) {
        return '';
    }

    // Adicionar zero à esquerda do dia ou mês
    const partesOrigem = formatoOrigem.split('/');
    let partes = data_nascimento.split('/');

    for (let i = 0; i < 3; i++) {
        if ((partesOrigem[i] === 'dd' || partesOrigem[i] === 'mm') && partes[i].length === 1) {
            partes[i] = '0' + partes[i];
        }
    }
    data_nascimento = partes.join('/');

    const regex = {
        'dd/mm/yyyy': /^(\d{2})\/(\d{2})\/(\d{4})$/,
        'dd/yyyy/mm': /^(\d{2})\/(\d{4})\/(\d{2})$/,
        'mm/dd/yyyy': /^(\d{2})\/(\d{2})\/(\d{4})$/,
        'yyyy/dd/mm': /^(\d{4})\/(\d{2})\/(\d{2})$/,
        'mm/yyyy/dd': /^(\d{2})\/(\d{4})\/(\d{2})$/,
        'yyyy/mm/dd': /^(\d{4})\/(\d{2})\/(\d{2})$/,

        'dd/mm/yy': /^(\d{2})\/(\d{2})\/(\d{2})$/,
        'dd/yy/mm': /^(\d{2})\/(\d{2})\/(\d{2})$/,
        'mm/dd/yy': /^(\d{2})\/(\d{2})\/(\d{2})$/,
        'yy/dd/mm': /^(\d{2})\/(\d{2})\/(\d{2})$/,
        'mm/yy/dd': /^(\d{2})\/(\d{2})\/(\d{2})$/,
        'yy/mm/dd': /^(\d{2})\/(\d{2})\/(\d{2})$/,
    };

    let dia, mes, ano;

    if (regex[formatoOrigem]) {
        const match = data_nascimento.match(regex[formatoOrigem]);
        if (match) {
            if (formatoOrigem === 'dd/mm/yyyy' || formatoOrigem === 'dd/mm/yy') {
                [, dia, mes, ano] = match;
            } else if (formatoOrigem === 'dd/yyyy/mm' || formatoOrigem === 'dd/yy/mm') {
                [, dia, ano, mes] = match;
            } else if (formatoOrigem === 'mm/dd/yyyy' || formatoOrigem === 'mm/dd/yy') {
                [, mes, dia, ano] = match;
            } else if (formatoOrigem === 'yyyy/dd/mm' || formatoOrigem === 'yy/dd/mm') {
                [, ano, dia, mes] = match;
            } else if (formatoOrigem === 'mm/yyyy/dd' || formatoOrigem === 'mm/yy/dd') {
                [, mes, ano, dia] = match;
            } else if (formatoOrigem === 'yyyy/mm/dd' || formatoOrigem === 'yy/mm/dd') {
                [, ano, mes, dia] = match;
            }
        } else {
            return '';
        }
    } else {
        return '';
    }

    if (dia <= 0 || dia > 31) {
        return '';
    } else if (mes <= 0 || mes > 12) {
        return '';
    } else if (ano.length === 4 && (ano < 1900 || ano > new Date().getFullYear())) {
        return '';
    }

    // Formata ano de 2 digitos para 4, ou vice-versa
    if (ano.length === 2 && (formatoFinal.match(/y/g) || []).length === 4) {
        if (ano > String(new Date().getFullYear()).slice(2)) {
            ano = `19${ano}`;
        } else {
            ano = `20${ano}`;
        }
    } else if (ano.length === 4 && (formatoFinal.match(/y/g) || []).length === 2) {
        ano = ano.slice(-2);
    }

    let dataFormatada;

    if (formatoFinal === 'dd/mm/yyyy' || formatoFinal === 'dd/mm/yy') {
        dataFormatada = `${dia}/${mes}/${ano}`;
    } else if (formatoFinal === 'dd/yyyy/mm' || formatoFinal === 'dd/yy/mm') {
        dataFormatada = `${dia}/${ano}/${mes}`;
    } else if (formatoFinal === 'mm/dd/yyyy' || formatoFinal === 'mm/dd/yy') {
        dataFormatada = `${mes}/${dia}/${ano}`;
    } else if (formatoFinal === 'yyyy/dd/mm' || formatoFinal === 'yy/dd/mm') {
        dataFormatada = `${ano}/${dia}/${mes}`;
    } else if (formatoFinal === 'mm/yyyy/dd' || formatoFinal === 'mm/yy/dd') {
        dataFormatada = `${mes}/${ano}/${dia}`;
    } else if (formatoFinal === 'yyyy/mm/dd' || formatoFinal === 'yy/mm/dd') {
        dataFormatada = `${ano}/${mes}/${dia}`;
    } else {
        return '';
    }

    return dataFormatada;

}

function corrigirData_lancamento(data, formatoOrigem, formatoFinal = 'dd/mm/yyyy') {
    // Remove espaços extras
    data = data.trim().replace(/\s+/g, " ");

    let time = [];

    if (data.includes(' ')) {
        data = data.split(' ');
        time = data[1].split(':');
    } else {
        const dataCorrigida = corrigirData_nascimento(data, formatoOrigem, formatoFinal);
        if (!dataCorrigida) {
            return "";
        }
        return `${dataCorrigida} ${'00:00:00'}`;
    }

    if (data.length > 2 || time.length != 3) {
        return "";
    }

    // Formato horas
    if (time[0] < 0 || time[0] >= 24) return "";
    if (time[1] < 0 || time[1] >= 60) return "";
    if (time[2] < 0 || time[2] >= 60) return "";

    // Corrigir data
    let data_lancamento = corrigirData_nascimento(data[0], formatoOrigem, formatoFinal);

    return `${data_lancamento} ${data[1]}`;
}

console.log(corrigirData_lancamento('12/31/2024 23:59:59', 'mm/dd/yyyy', 'dd/mm/yyyy'));
console.log(corrigirData_lancamento('12/31/2024', 'mm/dd/yyyy', 'dd/mm/yyyy'));