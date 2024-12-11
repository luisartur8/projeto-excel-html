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

function inserirRow(tr) {
    const table = document.querySelector('.table-excel table');
    if (!table) return;

    const tbody = table.querySelector('tbody') || table;

    if (tr) {
        tbody.appendChild(tr);
        return;
    }

    const lastRow = tbody.rows.length;

    const headers = table.querySelectorAll('th');
    tr = document.createElement('tr');

    const maxColumns = headers.length;

    for (let i = 0; i < maxColumns; i++) {
        const td = document.createElement('td');

        td.innerText = "";

        if (i === 0) {
            td.innerHTML = tableRemoveRowHTML;
        }
        if (i === 1) {
            td.innerHTML = `<span>${lastRow + 1}</span>`;
        }

        tr.appendChild(td);
    }

    tbody.appendChild(tr);
}

function removeRow(button) {
    const row = button.closest('tr');
    row.remove();
    atualizarNumeroLinha();
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

    const tipo = tipoPlanilha.value;

    if (tipo === 'cliente') {
        novaCelulaHeader.querySelector('.selectAtual').innerHTML = tipoCliente;
    } else if (tipo === 'lancamento') {
        novaCelulaHeader.querySelector('.selectAtual').innerHTML = tipoLancamento;
    } else if (tipo === 'oportunidade') {
        novaCelulaHeader.querySelector('.selectAtual').innerHTML = tipoOportunidade;
    } else if (tipo === 'produtos') {
        novaCelulaHeader.querySelector('.selectAtual').innerHTML = tipoProdutos;
    }

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
    if (celulaSelecionada) {
        celulaSelecionada.classList.remove('selected-cell');
        celulaSelecionada.classList.remove('selected-cell-editable');
        celulaSelecionada.contentEditable = "inherit";
        celulaSelecionada = null;
    }
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

function ordenarAlfabetico(button, ordem) {
    const index = capturarInfoTh(button).index;
    const { table, rows } = capturaInfoTable();

    if (!table) return;

    const ordemRed = [];
    const ordemNormal = [];

    // Captura as rows
    for (let i = 1; i < rows.length; i++) {
        const cell = rows[i].cells[index];

        if (cell) {
            if (cell.style.backgroundColor === "red") {
                ordemRed.push({
                    "cellContent": cell.textContent,
                    "row": rows[i]
                });
            } else {
                ordemNormal.push({
                    "cellContent": cell.textContent,
                    "row": rows[i]
                });
            }
        }
    }

    // Função para comparar os valores e garantir que os espaços em branco venham por último
    function compareWithWhitespaceHandling(a, b) {
        // Se ambos são espaços em branco ou vazios, mantem a ordem
        if (!a.cellContent && !b.cellContent) return 0;

        // Se um deles é vazio ou contém apenas espaços, ele vai para o final
        if (!a.cellContent || a.cellContent.trim() === "") return 1;
        if (!b.cellContent || b.cellContent.trim() === "") return -1;

        // Caso contrário, faz a comparação padrão
        if (ordem === 'crescente') {
            return a.cellContent.localeCompare(b.cellContent);
        } else if (ordem === 'decrescente') {
            return b.cellContent.localeCompare(a.cellContent);
        }

        return 0;
    }

    ordemRed.sort(compareWithWhitespaceHandling);
    ordemNormal.sort(compareWithWhitespaceHandling);

    // Remover todas as linhas
    for (let i = rows.length - 1; i > 0; i--) {
        rows[i].remove();
    }

    // Inserir primeiro as linhas em vermelho
    for (let i = 0; i < ordemRed.length; i++) {
        inserirRow(ordemRed[i].row);
    }

    for (let i = 0; i < ordemNormal.length; i++) {
        inserirRow(ordemNormal[i].row);
    }

    atualizarNumeroLinha();
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
        // Clientes
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
        // Lançamento
        case 'valor_venda':
            return corrigirValor_venda(dado);
        case 'valor_resgate':
            return corrigirValor_resgate(dado);
        case 'item_venda':
            return corrigirItem_venda(dado);
        case 'data_lancamento':
            return corrigirData_lancamento(dado);
        case 'nome_vendedor':
            return corrigirNome(dado);
        case 'codigo_vendedor':
            return corrigirCodigo_vendedor(dado);
        // Oportunidade
        case 'bonus_valor':
            return corrigirBonus_valor(dado);
        case 'bonus_validade':
            return corrigirBonus_validade(dado);
        // Produtos
        case 'codigo':
            return corrigirCodigo(dado);
        case 'percentual':
            return corrigirPercentual(dado);
        case 'validade':
            return corrigirValidade(dado);
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

function manterCelulaSelecionadaVisivel(celula) {

    const posicoes = celula.getBoundingClientRect();
    const top = posicoes.top;
    const bottom = posicoes.bottom;
    const right = posicoes.right;
    const left = posicoes.left;

    if (top < 212) { // Como pega esse 212 dinamicamente
        celula.scrollIntoView({ block: "start" });
    }

    if (left < 0) {
        celula.scrollIntoView({ block: "nearest", inline: "start" });
    }

    if (bottom > window.innerHeight) {
        celula.scrollIntoView({ block: "end" });
    }

    if (right > window.innerWidth) {
        celula.scrollIntoView({ block: "nearest", inline: "end" });
    }

}

function removeCelulaSelecionada() {
    if (celulaSelecionada) {
        celulaSelecionada.classList.remove('selected-cell');
        celulaSelecionada.classList.remove('selected-cell-editable');
        celulaSelecionada.contentEditable = "inherit";
        celulaSelecionada = null;
    }
}

function moverCursorParaFinal(celula) {
    const range = document.createRange(); // Cria um novo intervalo
    const sel = window.getSelection(); // Obtém o objeto Selection (onde o cursor está)

    range.selectNodeContents(celula); // Seleciona todo o conteúdo do elemento
    range.collapse(false); // Colapsa o intervalo para o final do conteúdo

    sel.removeAllRanges(); // Remove qualquer seleção anterior
    sel.addRange(range); // Define o novo intervalo, movendo o cursor para o final
}

function removeSelecaoTexto() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
        selection.removeAllRanges();
    }
}

function addEventListenersCelulaSelecionada() {
    const table = document.querySelector('.table-excel table');

    if (!table) return;

    let keydownHandler;
    let dblclickHandler;

    table.addEventListener('click', (e) => {
        const celula = e.target.closest('td');
        if (celula) {

            const indexColuna = Array.from(celula.parentNode.children).indexOf(celula);
            if (indexColuna === 0 || indexColuna === 1) {
                return;
            }

            // Remove a seleção anterior
            if (celulaSelecionada && (celula != celulaSelecionada)) {
                celulaSelecionada.classList.remove('selected-cell');
                celulaSelecionada.classList.remove('selected-cell-editable');
                celulaSelecionada.contentEditable = "inherit"; // Nota: No lugar de false usar inherit
                removeSelecaoTexto();
            }

            celulaSelecionada = celula;
            celulaSelecionada.classList.add('selected-cell');

            if (keydownHandler) {
                document.removeEventListener('keydown', keydownHandler);
            }

            if (dblclickHandler) {
                document.removeEventListener('dblclick', dblclickHandler);
            }

            dblclickHandler = (e) => {
                if (celulaSelecionada.contentEditable !== "true") {
                    celulaSelecionada.contentEditable = "true";
                    celulaSelecionada.classList.add('selected-cell-editable');
                    moverCursorParaFinal(celulaSelecionada);
                }
            }

            keydownHandler = (e) => {
                if (!celulaSelecionada) return;

                const linhaAtual = celulaSelecionada.parentElement; // <tr>
                let indexColuna = Array.from(linhaAtual.children).indexOf(celulaSelecionada);
                let proximaCelula;

                if (celulaSelecionada.classList.contains('selected-cell')) {
                    if (celulaSelecionada.contentEditable === 'inherit') { // Não está sendo editada no momento

                        e.preventDefault();

                        if (e.ctrlKey) {
                            if (e.key === 'c' || e.key === 'C') {
                                navigator.clipboard.writeText(celulaSelecionada.innerText);
                            } else if (e.key === 'v' || e.key === 'V') {
                                navigator.clipboard
                                    .readText()
                                    .then(
                                        (clipText) => (celulaSelecionada.innerText = clipText)
                                    );
                            } else if (e.key === 'z' || e.key === 'Z') {
                                console.log('Ctrl + Z');
                            } else if (e.key === 'y' || e.key === 'Y') {
                                console.log('Ctrl + Y'); // Contrario de Ctrl + Z
                            } else if (e.key === 'ArrowUp') {
                                let atual = linhaAtual;
                                let proximaLinha = atual.previousElementSibling;

                                if (proximaLinha) {
                                    if (proximaLinha.children[indexColuna].innerHTML === '') {
                                        while (true) {
                                            if (!proximaLinha) {
                                                proximaCelula = atual.children[indexColuna];
                                                break;
                                            }
                                            if (proximaLinha.children[indexColuna].innerHTML !== '') {
                                                proximaCelula = proximaLinha.children[indexColuna];
                                                break;
                                            }
                                            atual = proximaLinha;
                                            proximaLinha = atual.previousElementSibling;
                                        }
                                    } else {
                                        while (true) {
                                            if (!proximaLinha || proximaLinha.children[indexColuna].innerHTML === '') {
                                                proximaCelula = atual.children[indexColuna];
                                                break;
                                            }
                                            atual = proximaLinha;
                                            proximaLinha = atual.previousElementSibling;
                                        }
                                    }
                                }
                            } else if (e.key === 'ArrowLeft') {
                                let celulaAtual = linhaAtual.cells[indexColuna];
                                let celulaAnterior = linhaAtual.cells[indexColuna - 1];

                                if (celulaAnterior) {
                                    if (celulaAnterior.innerHTML === '') {
                                        while (true) {
                                            if (!celulaAnterior) {
                                                proximaCelula = celulaAtual;
                                                break;
                                            }
                                            if (celulaAnterior.innerHTML !== '') {
                                                proximaCelula = celulaAnterior;
                                                break;
                                            }
                                            indexColuna--;
                                            celulaAtual = linhaAtual.cells[indexColuna];
                                            celulaAnterior = linhaAtual.cells[indexColuna - 1];
                                        }
                                    } else {
                                        while (true) {
                                            if (!celulaAnterior || celulaAnterior.innerHTML === '') {
                                                proximaCelula = celulaAtual;
                                                break;
                                            }
                                            indexColuna--;
                                            celulaAtual = linhaAtual.cells[indexColuna];
                                            celulaAnterior = linhaAtual.cells[indexColuna - 1];
                                        }
                                    }

                                    if (indexColuna <= 2) {
                                        proximaCelula = linhaAtual.cells[2];
                                    }
                                }
                            } else if (e.key === 'ArrowDown') {
                                let atual = linhaAtual;
                                let proximaLinha = atual.nextElementSibling;

                                if (proximaLinha) {
                                    if (proximaLinha.children[indexColuna].innerHTML === '') {
                                        while (true) {
                                            if (!proximaLinha) {
                                                proximaCelula = atual.children[indexColuna];
                                                break;
                                            }
                                            if (proximaLinha.children[indexColuna].innerHTML !== '') {
                                                proximaCelula = proximaLinha.children[indexColuna];
                                                break;
                                            }
                                            atual = proximaLinha;
                                            proximaLinha = atual.nextElementSibling;
                                        }
                                    } else {
                                        while (true) {
                                            if (!proximaLinha || proximaLinha.children[indexColuna].innerHTML === '') {
                                                proximaCelula = atual.children[indexColuna];
                                                break;
                                            }
                                            atual = proximaLinha;
                                            proximaLinha = atual.nextElementSibling;
                                        }
                                    }
                                }
                            } else if (e.key === 'ArrowRight') {
                                let celulaAtual = linhaAtual.cells[indexColuna];
                                let celulaPosterior = linhaAtual.cells[indexColuna + 1];

                                if (celulaPosterior) {
                                    if (celulaPosterior.innerHTML === '') {
                                        while (true) {
                                            if (!celulaPosterior) {
                                                proximaCelula = celulaAtual;
                                                break;
                                            }
                                            if (celulaPosterior.innerHTML !== '') {
                                                proximaCelula = celulaPosterior;
                                                break;
                                            }
                                            indexColuna++;
                                            celulaAtual = linhaAtual.cells[indexColuna];
                                            celulaPosterior = linhaAtual.cells[indexColuna + 1];
                                        }
                                    } else {
                                        while (true) {
                                            if (!celulaPosterior || celulaPosterior.innerHTML === '') {
                                                proximaCelula = celulaAtual;
                                                break;
                                            }
                                            indexColuna++;
                                            celulaAtual = linhaAtual.cells[indexColuna];
                                            celulaPosterior = linhaAtual.cells[indexColuna + 1];
                                        }
                                    }
                                }
                            }
                        } else if (e.key === "Delete" || e.key === "Backspace") {
                            celulaSelecionada.innerHTML = "";
                            celulaSelecionada.style.backgroundColor = "white";
                            return;
                        } else if (e.key === 'ArrowUp') {
                            const linhaAcima = linhaAtual.previousElementSibling;
                            if (linhaAcima) {
                                proximaCelula = linhaAcima.children[indexColuna];
                            }
                        } else if (e.key === 'ArrowLeft') {
                            if ((indexColuna !== 2)) {
                                proximaCelula = linhaAtual.cells[indexColuna - 1];
                            }
                        } else if (e.key === 'ArrowDown') {
                            const proximaLinha = linhaAtual.nextElementSibling;
                            if (proximaLinha) {
                                proximaCelula = proximaLinha.children[indexColuna];
                            }
                        } else if (e.key === 'ArrowRight') {
                            if ((indexColuna)) {
                                proximaCelula = linhaAtual.cells[indexColuna + 1];
                            }
                        } else if (/^[\x20-\x7E\xA0-\xFF\u0100-\uFFFF]*$/.test(e.key)) { // Letras, numeros, outros caracs tipo -, +, etc
                            if (e.key.length === 1 && celulaSelecionada.contentEditable === 'inherit') { // Length 1, então: Sem Enter, Backspace, etc
                                celulaSelecionada.contentEditable = "true";
                                celulaSelecionada.classList.add('selected-cell-editable');
                                celulaSelecionada.innerHTML = e.key;
                                moverCursorParaFinal(celulaSelecionada);
                                return;
                            }
                        }
                    }
                }

                if (e.key === "Tab") {
                    e.preventDefault();
                    if ((indexColuna)) {
                        proximaCelula = linhaAtual.cells[indexColuna + 1];
                    }
                }

                if (e.key === "Enter") {
                    e.preventDefault();
                    const proximaLinha = linhaAtual.nextElementSibling;
                    if (proximaLinha) {
                        proximaCelula = proximaLinha.children[indexColuna];
                    }
                    if (celulaSelecionada.contentEditable === 'inherit') {
                        celulaSelecionada.contentEditable = "true";
                        celulaSelecionada.classList.add('selected-cell-editable');
                        moverCursorParaFinal(celulaSelecionada);
                        return;
                    }
                }

                // Se existe uma proxima celula, ela vira a atual
                if (proximaCelula) {
                    celulaSelecionada.classList.remove('selected-cell');
                    celulaSelecionada.classList.remove('selected-cell-editable');
                    celulaSelecionada.contentEditable = "inherit";
                    celulaSelecionada = proximaCelula;
                    celulaSelecionada.classList.add('selected-cell');
                    removeSelecaoTexto();
                }

                manterCelulaSelecionadaVisivel(celulaSelecionada);
                celulaSelecionada.focus();

            };

            document.addEventListener('keydown', keydownHandler);
            document.addEventListener('dblclick', dblclickHandler);
        }
    });
}

document.addEventListener('DOMContentLoaded', addEventListenersCelulaSelecionada);