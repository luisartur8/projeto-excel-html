const buttonBaixaPlanilha = document.getElementById('button-baixar-planilha');
const buttonApaga = document.getElementById('button-apaga-planilha');
//
const juntaDDDTelefone = document.getElementById('junta-ddd-telefone');
const buttonRemoveLinhas = document.getElementById('button-remove-linhas');
const buttonModeloPadrao = document.getElementById('button-modelo-padrao');

const buttonMesclarColunas = document.getElementById('button-mesclar-colunas');
const selectMesclarColunas = document.getElementById('select-mesclar-colunas');

const tableExcel = document.getElementById('table-excel');
const nenhumaPlanilha = document.getElementById('nenhuma-planilha');

const tipoPlanilha = document.getElementById('tipoPlanilha');

function mudarTipoPlanilha() {
    if (!tableExcel.querySelector('table')) {
        alert('Nenhuma planilha foi carregada!');
        tipoPlanilha.value = 'cliente';
        return;
    }

    const table = document.querySelector('.table-excel table');
    const row = table.querySelector("thead tr");

    const tipo = tipoPlanilha.value;

    for (let i = 2; i < row.cells.length; i++) {
        const selectAtual = row.cells[i].querySelector('.selectAtual');
        if (tipo === 'cliente') {
            selectAtual.innerHTML = tipoCliente;
            selectMesclarColunas.innerHTML = tipoCliente;
        } else if (tipo === 'lancamento') {
            selectAtual.innerHTML = tipoLancamento;
            selectMesclarColunas.innerHTML = tipoLancamento;
        } else if (tipo === 'oportunidade') {
            selectAtual.innerHTML = tipoOportunidade;
            selectMesclarColunas.innerHTML = tipoOportunidade;
        } else if (tipo === 'produtos') {
            selectAtual.innerHTML = tipoProdutos;
            selectMesclarColunas.innerHTML = tipoProdutos;
        }
    }
}

buttonBaixaPlanilha.addEventListener('click', () => {
    exportarParaExcel();
});

buttonApaga.addEventListener('click', () => {
    tableExcel.innerHTML = `<div class="nenhuma-planilha"><p>Nenhuma planilha carregada</p><input type="file" id="upload-planilha" accept=".xlsx, .xls" /><button id="button-carrega-planilha" class="button-padrao">Carregar planilha</button></div>`;
    addEventListeners();
});

juntaDDDTelefone.addEventListener('click', () => {

    if (!tableExcel.querySelector('table')) {
        alert('Nenhuma planilha foi carregada!');
        return;
    }

    const table = document.querySelector('.table-excel table');
    const rows = table.querySelectorAll("tbody tr");

    const headers = table.querySelectorAll('th');
    const headerValuesArray = Array.from(headers).map(header => {
        const select = header.querySelector('select');
        return select ? select.value : null;
    });

    let indexDDD = [];
    let indexTelefone = [];

    // Encontrar os índices das colunas DDD e telefone
    for (let i = 0; i < headerValuesArray.length; i++) {
        if (headerValuesArray[i] === 'DDD') {
            indexDDD.push(i);
        }
        if (headerValuesArray[i] === 'telefone') {
            indexTelefone.push(i);
        }
    }

    // Verificar se há apenas um DDD e pelo menos um telefone
    if (!(indexDDD.length === 1 && indexTelefone.length >= 1)) {
        alert('Apenas 1 DDD, e no mínimo 1 telefone');
        return;
    }

    // Juntar o DDD com os telefones
    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const dddCell = row.cells[indexDDD[0]];
        const ddd = dddCell ? dddCell.textContent.trim() : "";

        if (!ddd) continue;

        for (let i = 0; i < indexTelefone.length; i++) {
            const telefoneIndex = indexTelefone[i];
            const telefoneCell = row.cells[telefoneIndex];
            const telefone = telefoneCell ? telefoneCell.textContent.trim() : "";

            if (telefone) {
                // Corrige e concatena o DDD com o telefone
                const numeroCompleto = ddd + telefone;
                const correctedTelefone = numeroCompleto;

                if (correctedTelefone === '' && numeroCompleto !== '') {
                    telefoneCell.textContent = numeroCompleto;
                    telefoneCell.style.backgroundColor = "red";
                } else {
                    telefoneCell.textContent = correctedTelefone;
                    telefoneCell.style.backgroundColor = "white";
                }

            }
        }
    }

    // Remover a coluna DDD após juntar os números
    //removeColumnByIndex(indexDDD[0]);

});

buttonModeloPadrao.addEventListener('click', () => {

    if (!tableExcel.querySelector('table')) {
        alert('Nenhuma planilha foi carregada!');
        return;
    }

    const table = document.querySelector('.table-excel table');
    const rows = table.rows;

    const tipo = tipoPlanilha.value;

    // Pega o valor do select dentro do th
    let headers = table.querySelectorAll('th');
    const headerValuesArray = Array.from(headers).map(header => {
        const select = header.querySelector('select');
        return select ? select.value : null;
    });

    let indexHeader = {};

    let colunasRepetidas = false;

    headerValuesArray.forEach((header, index) => {
        if (header) {
            if (!indexHeader[header]) {
                indexHeader[header] = [];
            }
            indexHeader[header].push(index);
            if (indexHeader[header].length > 1) {
                colunasRepetidas = true;
            }
        }
    });

    if (colunasRepetidas) {
        alert('Não é permitido colunas com mesmo nome');
        return;
    }

    let ordem = [];

    if (tipo === 'cliente') {
        ordem = [
            ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
            ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
            ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
            ...(Array.isArray(indexHeader.data_nascimento) ? indexHeader.data_nascimento : [-1]),
            ...(Array.isArray(indexHeader.genero) ? indexHeader.genero : [-1]),
            ...(Array.isArray(indexHeader.email) ? indexHeader.email : [-1]),
            ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1]),
            ...(Array.isArray(indexHeader.DDD) ? indexHeader.DDD : [-1])
        ];
    } else if (tipo === 'lancamento') {
        ordem = [
            ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
            ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
            ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
            ...(Array.isArray(indexHeader.valor_venda) ? indexHeader.valor_venda : [-1]),
            ...(Array.isArray(indexHeader.valor_resgate) ? indexHeader.valor_resgate : [-1]),
            ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1]),
            ...(Array.isArray(indexHeader.item_venda) ? indexHeader.item_venda : [-1]),
            ...(Array.isArray(indexHeader.data_lancamento) ? indexHeader.data_lancamento : [-1]),
            ...(Array.isArray(indexHeader.nome_vendedor) ? indexHeader.nome_vendedor : [-1]),
            ...(Array.isArray(indexHeader.codigo_vendedor) ? indexHeader.codigo_vendedor : [-1]),
            ...(Array.isArray(indexHeader.DDD) ? indexHeader.DDD : [-1])
        ];
    } else if (tipo === 'oportunidade') {
        ordem = [
            ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
            ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
            ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
            ...(Array.isArray(indexHeader.data_nascimento) ? indexHeader.data_nascimento : [-1]),
            ...(Array.isArray(indexHeader.genero) ? indexHeader.genero : [-1]),
            ...(Array.isArray(indexHeader.email) ? indexHeader.email : [-1]),
            ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1]),
            ...(Array.isArray(indexHeader.DDD) ? indexHeader.DDD : [-1]),
            ...(Array.isArray(indexHeader.bonus_valor) ? indexHeader.bonus_valor : [-1]),
            ...(Array.isArray(indexHeader.bonus_validade) ? indexHeader.bonus_validade : [-1])
        ];
    } else if (tipo === 'produtos') {
        ordem = [
            ...(Array.isArray(indexHeader.codigo) ? indexHeader.codigo : [-1]),
            ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
            ...(Array.isArray(indexHeader.percentual) ? indexHeader.percentual : [-1]),
            ...(Array.isArray(indexHeader.validade) ? indexHeader.validade : [-1])
        ];
    };

    const headersOriginais = headers.length - 1;
    let novaColunaIndex = headers.length - 1;

    for (let i = 0; i < ordem.length; i++) {
        headers = table.querySelectorAll('th'); // Recarrega os headers
        const button = headers[novaColunaIndex]; // Ultimo header da table
        inserirNovaColuna(button, 'right');

        novaColunaIndex++;

        // Muda o titulo de acordo
        const newSelect = rows[0].cells[novaColunaIndex].querySelector('select');
        newSelect.selectedIndex = i;

        // Cola a coluna antiga na atual
        for (let r = 1; r < rows.length; r++) {
            if (ordem[i] === -1) {
                break;
            }

            const novaColuna = rows[r].cells[novaColunaIndex];
            const colunaAnterior = rows[r].cells[ordem[i]];

            novaColuna.innerHTML = colunaAnterior.innerHTML;
        }

    }

    // Remove as colunas antigas
    for (let i = headersOriginais; i > 1; i--) {
        removeColumnByIndex(i);
    }

});

buttonMesclarColunas.addEventListener('click', () => {

    if (!tableExcel.querySelector('table')) {
        alert('Nenhuma planilha foi carregada!');
        return;
    }

    const table = document.querySelector('.table-excel table');
    const rows = table.rows;

    // Pega os valores do select dentro do th
    const headers = table.querySelectorAll('th');
    const headerValuesArray = Array.from(headers).map(header => {
        const select = header.querySelector('select');
        return select ? select.value : null;
    });

    let indexHeader = [];
    const selectSelecionado = selectMesclarColunas.value;

    headerValuesArray.forEach((header, index) => {
        if (header) {
            if (header === selectSelecionado) {
                indexHeader.push(index);
            }
        }
    });

    if (indexHeader.length < 2) {
        return;
    }

    // Percorre cada coluna selecionada, joga os valores da ultima para a primeira e apaga a ultima
    for (let a = indexHeader.length - 1; a > 0; a--) {
        for (let i = 0; i < rows.length; i++) {

            const col1Index = indexHeader[0];
            const col2Index = indexHeader[a];

            if (col2Index < rows[i].cells.length) {
                const celulaCol1 = rows[i].cells[col1Index];
                const celulaCol2 = rows[i].cells[col2Index];

                if (celulaCol1.innerHTML.trim() === '') {
                    celulaCol1.innerHTML = celulaCol2.innerHTML;
                }

                rows[i].deleteCell(col2Index);
            }

        }

    }

});