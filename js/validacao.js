// DDD's validos no brasil até agosto/2024
const validDDDs = new Set([
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "21", "22", "24",
    "31", "32", "33", "34", "35", "37", "38",
    "27", "28",
    "51", "53", "54", "55",
    "47", "48", "49",
    "41", "42", "43", "44", "45", "46",
    "67",
    "65", "66",
    "62", "64",
    "61",
    "71", "73", "74", "75", "77",
    "79",
    "82",
    "81", "87",
    "83",
    "84",
    "85", "88",
    "86", "89",
    "98", "99",
    "96",
    "91", "93", "94",
    "92", "97",
    "95",
    "63",
    "69",
    "68"
]);

// Permite apenas números e remove zeros à esquerda.
const sanitizeNumber = valor => valor.replace(/[^0-9]/g, "").replace(/^0+/, "");

// Aplica máscara no formato (XX) XXXXX-XXXX, XXX.XXX.XXX-XX, 
const aplicarMascaraTelefone = valor => valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
const aplicarMascaraCPF = valor => valor.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const aplicarMascaraCNPJ = valor => valor.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2');

function corrigirNome(nome) {

    // Regex: Remove espaço extra por apenas um
    nome = nome.trim().toUpperCase().replace(/\s+/g, " ");

    if (nome !== nome.replace(/[^A-ZÀ-ÚÃ-ÕÇ a-zã-õ]/g, "")) {
        return "";
    }

    return nome;

}

function corrigirTelefone(telefone) {

    if (telefone.includes('+') && !telefone.replace(/[^0-9+]/g, "").startsWith('+55')) {
        return "";
    }

    telefone = sanitizeNumber(telefone);

    if (telefone.startsWith("55") && (telefone.length === 12 || telefone.length === 13)) {
        telefone = telefone.substring(2);
    }

    if ((telefone.length === 8 || telefone.length === 9) && checkboxTelefoneInserirDDD) {
        telefone = `${inputTelefoneInserirDDD.value}${telefone}`;
    }

    if (telefone.length >= 14 || telefone.length <= 9) {
        return "";
    }

    switch (telefone.length) {
        case 10:
            if (isValidDDD(telefone) && (telefone.charAt(2) === '9' || telefone.charAt(2) === '8')) {
                return aplicarMascaraTelefone(telefone.substring(0, 2) + '9' + telefone.substring(2));
            }
            return "";
        case 11:
            if (isValidDDD(telefone) && telefone.charAt(2) === '9') {
                return aplicarMascaraTelefone(telefone);
            }
            return "";
    }

    return "";

}

function corrigirTelefoneSemDDD(telefone) {

    telefone = sanitizeNumber(telefone);

    if (telefone.length >= 10 || telefone.length <= 7) {
        return "";
    }

    if (telefone.length === 8) {
        return `9${telefone}`;
    }

    if (!telefone.startsWith('9')) {
        return "";
    }

    return telefone;

}

function corrigirCpf_cnpj(cpf_cnpj) {

    cpf_cnpj = sanitizeNumber(cpf_cnpj);

    if (cpf_cnpj.length > 14 || cpf_cnpj.length <= 3) {
        return "";
    }

    if (cpf_cnpj.length <= 11) {
        //CPF
        const cpf = cpf_cnpj.padStart(11, '0'); // Adiciona zeros à esquerda até 11 digitos
        if (!isValidCPF(cpf)) {
            return "";
        }
        return aplicarMascaraCPF(cpf);
    } else {
        //CNPJ
        const cnpj = cpf_cnpj.padStart(14, '0'); // Adiciona zeros à esquerda até 14 digitos
        if (!isValidCNPJ(cnpj)) {
            return "";
        }
        return aplicarMascaraCNPJ(cnpj);
    }

}

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

function corrigirGenero(genero) {

    if (!genero || genero.trim().length < 1) {
        return "";
    }

    genero = genero.toUpperCase().trim();

    const primeiroChar = genero.charAt(0);
    const segundoChar = genero.length > 1 ? genero.charAt(1) : ' ';

    const somaChar = (primeiroChar + segundoChar).trim();

    if (somaChar === "FE" || somaChar === "MU") {
        return "F";
    }
    if (somaChar === "MA" || somaChar === "HO") {
        return "M";
    }

    if (genero.length === 1) {
        switch (primeiroChar) {
            case 'F':
                return "F";
            case 'M':
                return "M";
            default:
                return "";
        }
    }

    return "";

}

function corrigirEmail(email) {

    // Regex: Remove espaços extras
    email = email.trim().toLowerCase().replace(/\s+/g, " ");

    // Permite apenas um '@'
    if (email.indexOf('@') != email.lastIndexOf('@')) {
        return "";
    }

    // Detecta se o e-mail começa ou termina com "@"
    if (!(email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1)) {
        return "";
    }

    // Validação de comprimento (até 254 caracteres)
    if (email.length > 254) {
        return "";
    }

    // Alguns dominios de email conhecidos que não tem nada além do .com (Comum o usuario botar .br onde não existe)
    const domains = [
        "@hotmail.com", "@outlook.com", "@live.com", "@yahoo.com", "@gmail.com",
        "@icloud.com", "@me.com", "@mac.com", "@aol.com", "@zoho.com",
        "@mail.com", "@uol.com.br", "@bol.com.br", "@terra.com.br",
        "@globo.com", "@g1.com.br"
    ];
    const domainLengths = [12, 12, 9, 10, 10, 11, 7, 8, 8, 9, 9, 11, 11, 13, 10, 10];

    for (let i = 0; i < domains.length; i++) {
        const domain = domains[i];
        const domainIndex = email.indexOf(domain);

        if (domainIndex !== -1) {
            email = email.substring(0, domainIndex + domainLengths[i]);
        }
    }

    // Regex e-mail pattern
    const EMAIL_PATTERN = /^(?!.*__)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?<!-)\.[a-zA-Z]{2,}$/i;
    const matcher = EMAIL_PATTERN.test(email);

    if (!matcher) {
        return "";
    }

    // Mais comum do que parece
    if (email.endsWith('.con')) {
        return "";
    }

    return email;

}

const corrigirAnotacao = anotacao => anotacao.trim().replace(/,/g, " ").replace(/\s+/g, " "); // Tirar as virgulas / Remover espaços extras por apenas um.

function corrigirDDD(ddd) {

    ddd = sanitizeNumber(ddd);

    if (!ddd || ddd.length < 2) {
        return "";
    }

    return validDDDs.has(ddd) ? ddd : '';

}

// Retorna boolean - Pode passar o telefone inteiro
function isValidDDD(telefone) {

    telefone = sanitizeNumber(telefone);

    if (!telefone || telefone.length < 2) {
        return false;
    }

    const ddd = telefone.substring(0, 2);

    return validDDDs.has(ddd);

}

function isValidCPF(CPF) {
    let dig10, dig11;
    let sm, i, r, num, peso;

    // Verificação de CPF formado por sequência de números iguais deve ser feita fora do método
    if (!/^\d{11}$/.test(CPF)) {
        return false; // CPF deve conter exatamente 11 dígitos
    }

    // Cálculo do 1º Dígito Verificador
    sm = 0;
    peso = 10;
    for (i = 0; i < 9; i++) {
        num = parseInt(CPF.charAt(i), 10);
        sm += (num * peso);
        peso -= 1;
    }

    r = 11 - (sm % 11);
    dig10 = (r === 10 || r === 11) ? 0 : r;

    // Cálculo do 2º Dígito Verificador
    sm = 0;
    peso = 11;
    for (i = 0; i < 10; i++) {
        num = parseInt(CPF.charAt(i), 10);
        sm += (num * peso);
        peso -= 1;
    }

    r = 11 - (sm % 11);
    dig11 = (r === 10 || r === 11) ? 0 : r;

    // Verifica se os dígitos calculados conferem com os dígitos informados.
    return (dig10 == CPF.charAt(9) && dig11 == CPF.charAt(10));
}

function isValidCNPJ(cnpj) {
    // Verificação de CNPJ formado por sequência de números iguais tem que ser feita fora do método
    let dig13, dig14;
    let sm = 0;
    let peso = 2;

    // Tenta calcular os dígitos verificadores
    try {
        // Calculo do 1º Digito Verificador
        for (let i = 11; i >= 0; i--) {
            // Converte o i-ésimo caractere do CNPJ em um número:
            const num = parseInt(cnpj.charAt(i), 10);
            sm += num * peso;
            peso++;
            if (peso === 10) {
                peso = 2;
            }
        }

        let r = sm % 11;
        dig13 = (r === 0 || r === 1) ? '0' : String(11 - r);

        // Calculo do 2º Digito Verificador
        sm = 0;
        peso = 2;
        for (let i = 12; i >= 0; i--) {
            const num = parseInt(cnpj.charAt(i), 10);
            sm += num * peso;
            peso++;
            if (peso === 10) {
                peso = 2;
            }
        }

        r = sm % 11;
        dig14 = (r === 0 || r === 1) ? '0' : String(11 - r);

        // Verifica se os dígitos calculados conferem com os dígitos informados
        return (dig13 === cnpj.charAt(12) && dig14 === cnpj.charAt(13));
    } catch (error) {
        return false; // Se houver um erro, retorna falso
    }
}
