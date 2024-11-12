let data = [];

const table = document.querySelector(table);
const workbook = XLSX.utils.book_new();

for (let row of table.rows) {
    let rowData = [];
    for (let j = 2; j < row.cells.length; j++) {
        rowData.push(row.cells[j].innerText);
    }
    data.push(rowData);
}

console.log(data);