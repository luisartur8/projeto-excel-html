let modalGerenciadorPlanilhas = document.getElementById("modalTableExcel");
let btnOpenModalGerenciador = document.getElementById("openModalBtn");
let btnCloseModalGerenciador = document.getElementsByClassName("btn-close")[0];

btnOpenModalGerenciador.onclick = () => {
    modalGerenciadorPlanilhas.style.display = "block";
}

btnCloseModalGerenciador.onclick = function () {
    modalGerenciadorPlanilhas.style.display = "none";
}