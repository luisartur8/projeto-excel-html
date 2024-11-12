function exportarParaExcel() {
    const table = document.querySelector('.minha-tabela');

    if (!table) return;

    const workbook = XLSX.utils.book_new();

    let data = [];
    for (let row of table.rows) {
        let rowData = [];
        for (let j = 2; j < row.cells.length; j++) {
            rowData.push(row.cells[j].innerText);
        }
        data.push(rowData);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const finalRow = data.length - 1;
    const finalColumn = data[0].length - 1;
    worksheet['!ref'] = `A1:${XLSX.utils.encode_cell({ r: finalRow, c: finalColumn })}`;

    for (let C = 0; C < data[0].length; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        const selectElement = table.querySelector(`thead tr th:nth-child(${C + 3}) select`);

        if (selectElement) {
            worksheet[cellAddress] = {
                v: selectElement.value
            };
        }
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabela Exportada");
    XLSX.writeFile(workbook, "Tabela_Exportada.xlsx");
}
