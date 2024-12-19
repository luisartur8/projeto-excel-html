const modalLocalizarSubstituir = document.getElementById('modalLocalizarSubstituir');
const localizarSubstituirConteudo = document.querySelector('.modal-localiza-subst-conteudo');

const inputSearch = document.querySelector('.modal-input-search');
const inputReplace = document.querySelector('.modal-input-replace');

const upperLowerCheckbox = document.querySelector('.modal-search-upper-lower-checkbox');
const regexCheckbox = document.querySelector('.modal-search-regex-checkbox');

const campoInformacao = document.querySelector('.campo-mostrar-informacoes-search');

const botaoAcoes = document.querySelector('.botao-acoes');

const localizarSubstituirCloseButton = document.querySelector('#modalHeaderLocalizarSubstituir span');

const localizarSubstituirSearchButton = document.querySelector('.search-button');
const localizarSubstituirReplaceButton = document.querySelector('.replace-button');
const localizarSubstituirReplaceAllButton = document.querySelector('.replaceAll-button');
const localizarSubstituirDoneButton = document.querySelector('.done-button');

let indexAtualSearchReplace = null;
let indexLastSearch = null;

modalLocalizarSubstituir.addEventListener('click', () => {
    removeCelulaSelecionada();
});

localizarSubstituirSearchButton.addEventListener('click', () => {

    const infoTabela = capturaInfoTable();
    const rows = infoTabela.rows;

    if (indexLastSearch === null) {
        indexLastSearch = 0;
    }

    const buscarCelula = (startIndex, endIndex) => {
        for (let i = startIndex; i < endIndex; i++) {
            const cell = rows[i].cells[indexAtualSearchReplace];
            if (cell) {
                let cellText = cell.innerText;
                let inputText = inputSearch.value;

                if (!upperLowerCheckbox.checked) {
                    cellText = cellText.toUpperCase();
                    inputText = inputText.toUpperCase();
                }

                const regex = regexCheckbox.checked ? new RegExp(inputText, "g") : null;
                const found = regex ? regex.test(cellText) : cellText.includes(inputText);

                if (found && cell.tagName !== 'TH') {
                    if (celulaSelecionada) {
                        celulaSelecionada.classList.remove('selected-cell');
                        celulaSelecionada.contentEditable = "false";
                    }

                    localizarSubstituirReplaceButton.disabled = false;
                    localizarSubstituirReplaceAllButton.disabled = false;

                    celulaSelecionada = cell;
                    celulaSelecionada.classList.add('selected-cell');

                    indexLastSearch = i + 1;

                    rows[i].scrollIntoView({ block: "end" });
                    celulaSelecionada.focus();
                    return true;
                }
            }
        }
        return false;
    };

    if (!buscarCelula(indexLastSearch, rows.length)) {
        buscarCelula(0, indexLastSearch);
    }

});

localizarSubstituirReplaceButton.addEventListener('click', () => {
    const valor = inputSearch.value;
    const substituir = inputReplace.value;

    if (celulaSelecionada) {
        let cellText = celulaSelecionada.innerText;

        const regexFlags = upperLowerCheckbox.checked ? "g" : "gi";
        const regex = new RegExp(valor, regexFlags);

        if (regex) {
            cellText = cellText.replace(regex, substituir);
        } else {
            const removeRegex = new RegExp(valor, "gi");
            cellText = cellText.replace(removeRegex, "");
        }

        celulaSelecionada.innerText = cellText;

        if (cellText.trim() === '') {
            celulaSelecionada.innerText = '';
        }

        localizarSubstituirSearchButton.click();

    }

});

localizarSubstituirReplaceAllButton.addEventListener('click', () => {
    const valor = inputSearch.value;
    const substituir = inputReplace.value;

    const infoTabela = capturaInfoTable();
    const rows = infoTabela.rows;

    const regexFlags = upperLowerCheckbox.checked ? "g" : "gi";
    const regex = regexCheckbox.checked ? new RegExp(valor, regexFlags) : valor;

    for (let row of rows) {
        const cell = row.cells[indexAtualSearchReplace];
        if (cell && cell.tagName !== 'TH') {
            let cellText = cell.innerText;

            if (regex) {
                cellText = cellText.replace(regex, substituir);
            } else {
                cellText = cellText.split(valor).join(substituir);
            }

            cell.innerText = cellText;
        }
    }
});

inputSearch.addEventListener('input', () => {
    if (inputSearch.value === '') {
        localizarSubstituirSearchButton.disabled = true;
        localizarSubstituirReplaceButton.disabled = true;
        localizarSubstituirReplaceAllButton.disabled = true;
        return;
    }
    localizarSubstituirSearchButton.disabled = false;
    localizarSubstituirReplaceAllButton.disabled = false;
});

// Botões para fechar o modal
localizarSubstituirCloseButton.addEventListener('click', () => {
    modalLocalizarSubstituir.style.display = "none";
    indexAtualSearchReplace = null;
    indexLastSearch = null;
});

localizarSubstituirDoneButton.addEventListener('click', () => {
    modalLocalizarSubstituir.style.display = "none";
    indexAtualSearchReplace = null;
    indexLastSearch = null;
});

regexCheckbox.addEventListener('change', () => {
    if (regexCheckbox.checked) {
        upperLowerCheckbox.checked = true;
    }
});

// Configurações para abrir o modal
function configurarModalSelecionarSubstituir(index) {
    indexAtualSearchReplace = index;
    modalLocalizarSubstituir.style.display = "flex";
    centerModal(localizarSubstituirConteudo);

    inputSearch.value = '';
    inputSearch.focus();
    inputReplace.value = '';

    regexCheckbox.checked = false;
    upperLowerCheckbox.checked = false;

    localizarSubstituirSearchButton.disabled = true;
    localizarSubstituirReplaceButton.disabled = true;
    localizarSubstituirReplaceAllButton.disabled = true;

    // Celula da table da planilha
    removeCelulaSelecionada();
}
