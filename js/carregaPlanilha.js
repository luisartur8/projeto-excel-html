let selectedFile;
const table = document.querySelector('.table-excel table');

let workbookName;
let firstSheetName;

function addEventListeners() {
    document.getElementById('upload-planilha').addEventListener('change', function (event) {
        selectedFile = event.target.files[0];
    });

    document.getElementById('button-carrega-planilha').addEventListener('click', handleFileUpload);
}

// Função para carregar a planilha
function handleFileUpload() {
    if (!selectedFile) {
        alert("Por favor, selecione um arquivo Excel primeiro.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        workbookName = selectedFile.name;
        firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        fillTable(jsonData);
    };

    reader.readAsArrayBuffer(selectedFile);
}

function fillTable(data) {
    const tableContainer = document.querySelector('.table-excel');
    const nenhumaPlanilhaDiv = document.querySelector('.nenhuma-planilha');

    const table = document.createElement('table');
    table.className = 'minha-tabela';
    table.border = "1";

    const maxColumns = Math.max(...data.map(row => row.length));
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    for (let i = 0; i < maxColumns + 2; i++) {
        const th = document.createElement('th');

        th.innerHTML = headerContentHTML;

        if (i === 0 || i === 1) {
            th.innerHTML = '';
        }
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const tr = document.createElement('tr');

        for (let j = 0; j < maxColumns + 2; j++) {
            const td = document.createElement('td');
            td.innerText = (row[j - 2] !== undefined && row[j - 2] !== null) ? row[j - 2] : "";
            if (j === 0) {
                td.innerHTML = tableRemoveRowHTML;
            }
            if (j === 1) {
                td.innerHTML = `<span>${i + 1}</span>`;
            }
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);

    nenhumaPlanilhaDiv.style.display = 'none';

    addEventListenersCelulaSelecionada(); // Manipular as celulas individuais ao click
}

document.addEventListener('DOMContentLoaded', addEventListeners);
