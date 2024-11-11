const modalValidaNascimento = document.getElementById('modalValidaNascimento');
const modalNascimentoContent = document.querySelector('.modal-nascimento-conteudo');

const seletorNascimentoOriginal1 = document.querySelector('.dia-mes-ano-original-1');
const seletorNascimentoOriginal2 = document.querySelector('.dia-mes-ano-original-2');
const seletorNascimentoOriginal3 = document.querySelector('.dia-mes-ano-original-3');

const seletorNascimentoFinal1 = document.querySelector('.dia-mes-ano-final-1');
const seletorNascimentoFinal2 = document.querySelector('.dia-mes-ano-final-2');
const seletorNascimentoFinal3 = document.querySelector('.dia-mes-ano-final-3');

const buttonValidarNascimento = document.querySelector('.botaoValidarNascimento');
const buttonFecharNascimento = document.querySelector('.botaoFecharNascimento');

function formatoOriginal() {
    return `${seletorNascimentoOriginal1.value}/${seletorNascimentoOriginal2.value}/${seletorNascimentoOriginal3.value}`;
}

function formatoFinal() {
    return `${seletorNascimentoFinal1.value}/${seletorNascimentoFinal2.value}/${seletorNascimentoFinal3.value}`;
}

buttonValidarNascimento.onclick = () => {
    executarValidacao(indexAtual, rowsAtual, comboBoxNameAtual);
    configurarModalDataNascimento();
    modalValidaNascimento.style.display = "none";
}

buttonFecharNascimento.onclick = () => {
    configurarModalDataNascimento();
    modalValidaNascimento.style.display = "none";
}

function configurarModalDataNascimento() {
    modalValidaNascimento.style.display = "flex";

    seletorNascimentoOriginal1.value = 'dd';
    seletorNascimentoOriginal2.value = 'mm';
    seletorNascimentoOriginal3.value = 'yyyy';

    seletorNascimentoFinal1.value = 'dd';
    seletorNascimentoFinal2.value = 'mm';
    seletorNascimentoFinal3.value = 'yyyy';

    centerModal(modalNascimentoContent);
}