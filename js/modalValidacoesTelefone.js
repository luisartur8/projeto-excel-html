const modalValidaTelefone = document.getElementById("modalValidaTelefone");
const modalTelefoneContent = document.querySelector('.modal-telefone-content');
const headerValidaTelefone = document.getElementById("modalHeaderValidaTelefone");

const btnOpenModalTelefone = document.getElementById("btn-executar-validacao");
const buttonValidarTelefone = document.querySelector('.botaoValidarTelefone');
const buttonFecharTelefone = document.querySelector('.botaoFecharTelefone');

const radioTelefoneSemDDD = document.querySelector('.radio-telefone-sem-ddd');
const radioTelefoneComDDD = document.querySelector('.radio-telefone-com-ddd');
const checkboxTelefoneInserirDDD = document.querySelector('.checkbox-telefone-inserir-ddd');
const inputTelefoneInserirDDD = document.querySelector('.input-telefone-inserir-ddd');
const dddInvalidoParagrafo = document.querySelector('.p-ddd-invalido');

modalValidaTelefone.addEventListener('change', () => {
    inputTelefoneInserirDDD.style.border = '1px solid black';
    dddInvalidoParagrafo.style.opacity = '0';
});

buttonValidarTelefone.onclick = () => {

    let dddAdd = inputTelefoneInserirDDD.value;

    if (!isValidDDD(dddAdd) && checkboxTelefoneInserirDDD.checked) {
        inputTelefoneInserirDDD.value = "";
        inputTelefoneInserirDDD.style.border = '1px solid red';
        dddInvalidoParagrafo.style.opacity = '1';
        return;
    }

    if (radioTelefoneSemDDD.checked === true) {
        executarValidacao(indexAtual, rowsAtual, 'corrigirTelefoneSemDDD');
        modalValidaTelefone.style.display = "none";
        return;
    }

    if (radioTelefoneComDDD.checked === true) {
        executarValidacao(indexAtual, rowsAtual, comboBoxNameAtual);
        modalValidaTelefone.style.display = "none";
        return;
    }

}

buttonFecharTelefone.onclick = () => {
    configurarModalTelefone();
    modalValidaTelefone.style.display = "none";
}

radioTelefoneSemDDD.onclick = () => {
    inputTelefoneInserirDDD.disabled = true;
    inputTelefoneInserirDDD.value = "";
    checkboxTelefoneInserirDDD.checked = false;
    checkboxTelefoneInserirDDD.disabled = true;
}

radioTelefoneComDDD.onclick = () => {
    inputTelefoneInserirDDD.disabled = true;
    checkboxTelefoneInserirDDD.disabled = false;
}

checkboxTelefoneInserirDDD.onclick = () => {
    let checked = checkboxTelefoneInserirDDD.checked;
    if (checked) {
        inputTelefoneInserirDDD.disabled = false;
    } else {
        inputTelefoneInserirDDD.disabled = true;
        inputTelefoneInserirDDD.value = "";
    }
}

function configurarModalTelefone() {
    modalValidaTelefone.style.display = "flex";
    inputTelefoneInserirDDD.style.border = '1px solid black';
    dddInvalidoParagrafo.style.opacity = '0';

    inputTelefoneInserirDDD.disabled = true;
    inputTelefoneInserirDDD.value = "";
    radioTelefoneSemDDD.checked = true;
    checkboxTelefoneInserirDDD.disabled = true;
    checkboxTelefoneInserirDDD.checked = false;

    centerModal(modalTelefoneContent);
}