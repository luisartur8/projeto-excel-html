const buttonApaga = document.getElementById('button-apaga-planilha');
const juntaDDDTelefone = document.getElementById('junta-ddd-telefone');
const tableExcel = document.getElementById('table-excel');
const nenhumaPlanilha = document.getElementById('nenhuma-planilha');
const removerLinhasVazias = document.getElementById('remove-linhas-vazias');

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


removerLinhasVazias.addEventListener('click', () => {
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