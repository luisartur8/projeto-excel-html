function corrigirData_nascimento(data_nascimento, formatoOrigem, formatoFinal = 'dd/mm/yyyy') {

    data_nascimento = data_nascimento.replace(/\D/g, '/');
    
    const numeroBarras = (data_nascimento.match(/\//g) || []).length;
    
    if (numeroBarras != 2) {
        return '';
    }

    // Adicionar zero à esquerda do dia ou mês
    const partesOrigem = formatoOrigem.split('/');
    let partes = data_nascimento.split('/');

    for (let i = 0; i < 3; i++) {
        if (partesOrigem[i] === 'dd' || partesOrigem[i] === 'mm') {
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
            [_, dia, mes, ano] = match;
        } else if (formatoOrigem === 'dd/yyyy/mm' || formatoOrigem === 'dd/yy/mm') {
            [_, dia, ano, mes] = match;
        } else if (formatoOrigem === 'mm/dd/yyyy' || formatoOrigem === 'mm/dd/yy') {
            [_, mes, dia, ano] = match;
        } else if (formatoOrigem === 'yyyy/dd/mm' || formatoOrigem === 'yy/dd/mm') {
            [_, ano, dia, mes] = match;
        } else if (formatoOrigem === 'mm/yyyy/dd' || formatoOrigem === 'mm/yy/dd') {
            [_, mes, ano, dia] = match;
        } else if (formatoOrigem === 'yyyy/mm/dd' || formatoOrigem === 'yy/mm/dd') {
            [_, ano, mes, dia] = match;    
        }
      } else {
        return '';
      }
    } else {
        return '';
    }

    if (ano.length === 2 && (formatoFinal.match(/y/g) || []).length === 4) {
        if (ano > String(new Date().getFullYear()).slice(2)) {
            ano = `19${ano}`;
        } else {
            ano = `20${ano}`;
        }
    }

    if (dia <= 0 || dia > 31) {
        return '';
    } else if (mes <= 0 || mes > 12) {
        return '';
    } else if (ano.length === 4 && (ano < 1900 || ano > new Date().getFullYear())) {
        return '';
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

console.log(corrigirData_nascimento('3;24;9', 'mm/yy/dd', 'dd/mm/yyyy'));
//console.log(String(new Date().getFullYear()).slice(2));

//console.log('ab'.match(/y/g));