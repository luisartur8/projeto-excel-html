const headerContentHTML = `
    <div class="botoes-header">
        <span class="btn-inserir-esquerda" onclick="inserirNovaColuna(this, 'left')"><</span>
        <span class="btn-remove" onclick="removeColumnModal(this)">X</span>
        <span class="btn-executar-validacao" onclick="abrirModalValidacao(this)">O</span>
        <span class="btn-apaga-red" onclick="apagaLinhaVermelha(this)">U</span>
        <span class="btn-abrir-localizar-substituir" onclick="abrirLocalizarSubstituir(this)">L</span>
        <span class="btn-inserir-esquerda" onclick="inserirNovaColuna(this, 'right')">></span>
    </div>
    <select name="aaa" id="comboTipos">
        <option value="nome">nome</option>
        <option value="telefone">telefone</option>
        <option value="cpf_cnpj">cpf_cnpj</option>
        <option value="data_nascimento">data_nascimento</option>
        <option value="genero">genero</option>
        <option value="email">email</option>
        <option value="anotacao">anotacao</option>
        <option value="DDD">DDD</option>
    </select>`;

const tableRemoveRowHTML = `<span class="btn-remove" onclick="removeRow(this)">X</span>`;