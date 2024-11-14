const modalRemoverLinhas = document.getElementById('modalRemoveLinhas');
const modalRemoverLinhasConteudo = document.querySelector('.modal-remove-linhas-conteudo');

const btnOpenModalLinhas = document.getElementById('button-remove-linhas');
const btnCloseModalLinhas = document.querySelector('.close-modal-linhas-btn');

const btnRemoverLinhasVazias = document.querySelector('.remover-linhas-vazias');
const btnRemoverColunasVazias = document.querySelector('.remover-colunas-vazias');
const btnRemoverLinhasEspecificas = document.querySelector('.remover-linhas-especificas');

const cbNomeRemoveLinha = document.querySelector('.modal-linhas-nome-checkbox');
const cbTelefoneRemoveLinha = document.querySelector('.modal-linhas-telefone-checkbox');
const cbCpfCnpjRemoveLinha = document.querySelector('.modal-linhas-cpf_cnpj-checkbox');
const cbDataNascimentoRemoveLinha = document.querySelector('.modal-linhas-data_nascimento-checkbox');
const cbGeneroRemoveLinha = document.querySelector('.modal-linhas-genero-checkbox');
const cbEmailRemoveLinha = document.querySelector('.modal-linhas-email-checkbox');
const cbAnotacaoRemoveLinha = document.querySelector('.modal-linhas-anotacao-checkbox');

function configurarModalRemoveLinhas() {
    cbNomeRemoveLinha.checked = false;
    cbTelefoneRemoveLinha.checked = true;
    cbCpfCnpjRemoveLinha.checked = true;
    cbDataNascimentoRemoveLinha.checked = false;
    cbGeneroRemoveLinha.checked = false;
    cbEmailRemoveLinha.checked = false;
    cbAnotacaoRemoveLinha.checked = false;

    centerModal(modalRemoverLinhasConteudo);
}

btnOpenModalLinhas.addEventListener('click', () => {

    if (!tableExcel.querySelector('table')) {
        alert('Nenhuma planilha foi carregada!');
        return;
    }

    configurarModalRemoveLinhas();
    modalRemoverLinhas.style.display = "flex";
});

btnCloseModalLinhas.addEventListener('click', () => {
    configurarModalRemoveLinhas();
    modalRemoverLinhas.style.display = "none";
});

btnRemoverLinhasVazias.addEventListener('click', () => {
    const infosTable = capturaInfoTable();

    if (!infosTable.table || !infosTable.rows) return;

    const rows = infosTable.rows;
    let linhasRemovidas = 0;

    for (let r = rows.length - 1; r >= 0; r--) {
        const cells = rows[r].cells;
        let isEmpty = true;

        for (let c = 2; c < cells.length; c++) {
            if (cells[c].innerHTML.trim() !== '') {
                isEmpty = false;
                break;
            }
        }

        if (isEmpty) {
            rows[r].remove();
            linhasRemovidas++;
        }
    }

    atualizarNumeroLinha();
});

btnRemoverColunasVazias.addEventListener('click', () => {
    const infosTable = capturaInfoTable();

    const rows = infosTable.rows;

    if (!infosTable.table || !infosTable.rows) return;

    const colunas = rows[0].cells.length;

    for (let c = colunas - 1; c >= 2; c--) {

        let apagaColuna = true;

        for (let r = rows.length - 1; r > 0; r--) {

            const celula = rows[r].cells[c];
            if (celula.textContent.trim() !== '') {
                apagaColuna = false;
                break;
            }

        }

        if (apagaColuna) {
            removeColumnByIndex(c);
        }

    }

});

btnRemoverLinhasEspecificas.addEventListener('click', () => {

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

    let indexNome = [];
    let indexTelefone = [];
    let indexCpf_cnpj = [];
    let indexData_nascimento = [];
    let indexGenero = [];
    let indexEmail = [];
    let indexAnotacao = [];

    for (let i = 0; i < headerValuesArray.length; i++) {
        if (headerValuesArray[i] === 'nome') {
            indexNome.push(i);
        }
        if (headerValuesArray[i] === 'telefone') {
            indexTelefone.push(i);
        }
        if (headerValuesArray[i] === 'cpf_cnpj') {
            indexCpf_cnpj.push(i);
        }
        if (headerValuesArray[i] === 'data_nascimento') {
            indexData_nascimento.push(i);
        }
        if (headerValuesArray[i] === 'genero') {
            indexGenero.push(i);
        }
        if (headerValuesArray[i] === 'email') {
            indexEmail.push(i);
        }
        if (headerValuesArray[i] === 'anotacao') {
            indexAnotacao.push(i);
        }
    }

    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];

        let todasVazias = true;

        if (cbNomeRemoveLinha.checked) {
            for (let j = 0; j < indexNome.length; j++) {
                const colunaNome = indexNome[j];
                if (row.cells[colunaNome].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (cbTelefoneRemoveLinha.checked) {
            for (let j = 0; j < indexTelefone.length; j++) {
                const colunaTelefone = indexTelefone[j];
                if (row.cells[colunaTelefone].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (cbCpfCnpjRemoveLinha.checked) {
            for (let j = 0; j < indexCpf_cnpj.length; j++) {
                const colunaCpf = indexCpf_cnpj[j];
                if (row.cells[colunaCpf].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (cbDataNascimentoRemoveLinha.checked) {
            for (let j = 0; j < indexData_nascimento.length; j++) {
                const colunaData = indexData_nascimento[j];
                if (row.cells[colunaData].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (cbGeneroRemoveLinha.checked) {
            for (let j = 0; j < indexGenero.length; j++) {
                const colunaGenero = indexGenero[j];
                if (row.cells[colunaGenero].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (cbEmailRemoveLinha.checked) {
            for (let j = 0; j < indexEmail.length; j++) {
                const colunaEmail = indexEmail[j];
                if (row.cells[colunaEmail].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (cbAnotacaoRemoveLinha.checked) {
            for (let j = 0; j < indexAnotacao.length; j++) {
                const colunaAnotacao = indexAnotacao[j];
                if (row.cells[colunaAnotacao].textContent.trim() !== '') {
                    todasVazias = false;
                    break;
                }
            }
        }

        if (todasVazias) {
            row.remove();
        }
    }

    atualizarNumeroLinha();

});
