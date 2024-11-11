// Usado para centralizar o PopUp e mover na tela
const popUpExclusaoConteudo = document.querySelector('.popupExclusaoConteudo');
const headerPopUpExcluirColuna = document.querySelector('.popupHeaderExcluirColuna');

// Ações do modal
const popUpDeletaColunaCancelar = document.querySelector('.popupBotaoCancelarColuna');
const popUpDeletaColunaExcluir = document.querySelector('.popupBotaoExcluirColuna');
const modalPopUpDeletaColuna = document.querySelector('#popupDeletaColuna');

function cancelarColunaPopUpConfirmacao() {
    modalPopUpDeletaColuna.style.display = 'none';
}
popUpDeletaColunaCancelar.onclick = cancelarColunaPopUpConfirmacao;

function deletarColunaPopUpConfirmacao() {
    removeColumnByIndex(removeColumnAtualIndex);
    modalPopUpDeletaColuna.style.display = 'none';
}
popUpDeletaColunaExcluir.onclick = deletarColunaPopUpConfirmacao;

modalPopUpDeletaColuna.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        deletarColunaPopUpConfirmacao();
    }
    if (e.key === 'Escape') {
        cancelarColunaPopUpConfirmacao();
    }
});
