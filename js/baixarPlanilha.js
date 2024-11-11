function exportarParaExcel() {
    const tabela = document.querySelector('.minha-tabela');
    const worksheet = XLSX.utils.table_to_sheet(tabela);

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let c = range.s.c; c <= range.e.c; c++) {
        if (c < 2) continue;
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: c });
        const selectElement = tabela.querySelector(`thead tr th:nth-child(${c + 1}) select`);
        if (selectElement) {
            worksheet[cellAddress].v = selectElement.value;
            worksheet[cellAddress].s = {
                fill: { fgColor: { rgb: "ADD8E6" } },
                font: { bold: true }
            };
        }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'nome do arquivo');
    XLSX.writeFile(workbook, 'TabelaExportada.xlsx');
}

const buttonBaixaPlanilha = document.getElementById('button-baixar-planilha');

buttonBaixaPlanilha.addEventListener('click', () => {
    exportarParaExcel();
});