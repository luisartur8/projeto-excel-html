let indexAtual;
let rowsAtual;
let comboBoxNameAtual;
let removeColumnAtualIndex;
let celulaSelecionada = null;

function capturaInfoTable() {
    const table = document.querySelector('.table-excel table');
    const rows = table.rows;
    return {
        table: table,
        rows: rows
    };
}

function capturarInfoTh(button) {
    const th = button.closest('th');
    const index = Array.from(th.parentNode.children).indexOf(th);
    const comboBoxName = th.querySelector('select').value;

    return {
        th: th,
        index: index,
        comboBoxName: comboBoxName
    };
}

function inserirNovaColuna(button, lado) {
    const table = document.querySelector('.table-excel table');
    if (!table) return;

    const rows = table.rows;
    const dadosTh = capturarInfoTh(button);

    let index;
    if (lado === 'left') {
        index = dadosTh.index;
    }

    if (lado === 'right') {
        index = dadosTh.index + 1;
    }

    if (!index) {
        return;
    }

    const novaCelulaHeader = document.createElement('th');
    novaCelulaHeader.innerHTML = headerContentHTML;

    const headerRow = rows[0];
    headerRow.insertBefore(novaCelulaHeader, rows[0].cells[index]);

    for (let i = 1; i < rows.length; i++) {
        const novaCelula = rows[i].insertCell(index);
        novaCelula.innerHTML = "";

        const celulaOriginal = rows[i].cells[index + 1];
        if (celulaOriginal) {
            for (let attr of celulaOriginal.attributes) {
                novaCelula.setAttribute(attr.name, attr.value);
            }
        }
    }
}

function removeRow(button) {
    const row = button.closest('tr');
    row.remove();
    atualizarNumeroLinha();
}

function removeColumnByIndex(index) {
    const { table, rows } = capturaInfoTable();

    if (!table) return;

    for (let i = 0; i < rows.length; i++) {
        rows[i].deleteCell(index);
    }
}

function removeColumnModal(button) {
    document.querySelector('#popupDeletaColuna').style.display = 'flex';
    modalPopUpDeletaColuna.focus();
    centerModal(popUpExclusaoConteudo);
    removeColumnAtualIndex = capturarInfoTh(button).index;
}

function apagaLinhaVermelha(button) {
    const index = capturarInfoTh(button).index;
    const { table, rows } = capturaInfoTable();

    if (!table) return;

    for (let i = 1; i < rows.length; i++) {
        const cell = rows[i].cells[index];

        if (cell && cell.style.backgroundColor === "red") {
            cell.style.backgroundColor = "white";
            cell.textContent = '';
        }
    }
}

function abrirLocalizarSubstituir(button) {
    const index = capturarInfoTh(button).index;
    configurarModalSelecionarSubstituir(index);
}

function abrirModalValidacao(button) {
    const { index, comboBoxName } = capturarInfoTh(button);
    const { table, rows } = capturaInfoTable();

    if (!table) return;

    // Variaveis global
    indexAtual = index;
    rowsAtual = rows;
    comboBoxNameAtual = comboBoxName;

    if (comboBoxName === 'telefone') {
        configurarModalTelefone();
        return;
    }

    if (comboBoxName === 'data_nascimento') {
        configurarModalDataNascimento();
        return;
    }

    // Caso não tenha modal para abrir
    executarValidacao(index, rows, comboBoxName);
}

function executarValidacao(index, rows, comboBoxName) {
    for (i = 1; i < rows.length; i++) {
        const cell = rows[i].cells[index];
        if (cell) {
            const originalValue = cell.textContent;
            const correctedValue = validarCelula(originalValue, comboBoxName);

            if (correctedValue === '' && originalValue !== '') {
                cell.textContent = originalValue;
                cell.style.backgroundColor = "red";
            } else {
                cell.textContent = correctedValue;
                cell.style.backgroundColor = "white";
            }
        }
    }
}

function validarCelula(dado, comboBoxName) {
    switch (comboBoxName) {
        case 'nome':
            return corrigirNome(dado);
        case 'telefone':
            return corrigirTelefone(dado);
        case 'cpf_cnpj':
            return corrigirCpf_cnpj(dado);
        case 'data_nascimento':
            return corrigirData_nascimento(dado, formatoOriginal(), formatoFinal());
        case 'genero':
            return corrigirGenero(dado);
        case 'email':
            return corrigirEmail(dado);
        case 'anotacao':
            return corrigirAnotacao(dado);
        case 'DDD':
            return corrigirDDD(dado);
        case 'corrigirTelefoneSemDDD':
            return corrigirTelefoneSemDDD(dado);
        default:
            return dado;
    }
}

function atualizarNumeroLinha() {
    const { rows } = capturaInfoTable();

    [...rows].slice(1).forEach((row, index) => {
        row.cells[1].innerHTML = `<span>${index + 1}</span>`;
    });
}

function centerModal(modalContent) {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var modalWidth = modalContent.offsetWidth;
    var modalHeight = modalContent.offsetHeight;

    modalContent.style.position = 'fixed';
    modalContent.style.left = (windowWidth / 2 - modalWidth / 2) + "px";
    modalContent.style.top = (windowHeight / 2 - modalHeight / 2) + "px";
}

function addEventListenersCelulaSelecionada() {
    const table = document.querySelector('.table-excel table');

    if (!table) return;

    let keydownHandler;

    table.addEventListener('click', (e) => {
        const celula = e.target.closest('td');
        if (celula) {
            // Remove a seleção anterior
            if (celulaSelecionada && (celula != celulaSelecionada)) {
                celulaSelecionada.classList.remove('selected-cell');
                celulaSelecionada.contentEditable = "false";
            }

            const indexColuna = Array.from(celula.parentNode.children).indexOf(celula);
            if (indexColuna === 0 || indexColuna === 1) {
                return;
            }

            celulaSelecionada = celula;
            celulaSelecionada.classList.add('selected-cell');
            celulaSelecionada.contentEditable = "true";

            if (keydownHandler) {
                document.removeEventListener('keydown', keydownHandler);
            }

            keydownHandler = (e) => {
                if (!celulaSelecionada) return;

                const linhaAtual = celulaSelecionada.parentElement;
                const indexColuna = Array.from(linhaAtual.children).indexOf(celulaSelecionada);

                if (e.key === "Delete" && celulaSelecionada.classList.contains('selected-cell')) {
                    celulaSelecionada.innerHTML = "";
                    celulaSelecionada.style.backgroundColor = "white";
                    return;
                }

                if (e.key === "Enter" && celulaSelecionada.classList.contains('selected-cell')) {
                    e.preventDefault(); // Evitar a ação padrão do Enter
                    const linhaAtual = celulaSelecionada.parentElement;
                    const proximaLinha = linhaAtual.nextElementSibling;

                    if (proximaLinha) {
                        const indexColuna = Array.from(linhaAtual.children).indexOf(celulaSelecionada);
                        const proximaCelula = proximaLinha.children[indexColuna];

                        if (proximaCelula) {
                            celulaSelecionada.classList.remove('selected-cell');
                            celulaSelecionada.contentEditable = "false";

                            celulaSelecionada = proximaCelula;
                            celulaSelecionada.classList.add('selected-cell');
                        }
                    }
                }

                celulaSelecionada.focus();
            };

            document.addEventListener('keydown', keydownHandler);
        }
    });
}

document.addEventListener('DOMContentLoaded', addEventListenersCelulaSelecionada);