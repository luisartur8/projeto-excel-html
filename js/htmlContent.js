const headerContentHTML = `
    <div class="botoes-header">
        <span class="btn-inserir-esquerda" onclick="inserirNovaColuna(this, 'left')"><</span>
        <div class="thead-icons-central">
            <span class="btn-remove" onclick="removeColumnModal(this)">X</span>
            <button class="btn-executar-validacao" onclick="abrirModalValidacao(this)"><img src="assets/icon-header/lista-valida.png"></button>
            <button class="btn-apaga-red" onclick="apagaLinhaVermelha(this)"><img src="assets/icon-header/lista-apagar.png"></button>
            <button class="btn-abrir-localizar-substituir" onclick="abrirLocalizarSubstituir(this)"><img src="assets/icon-header/lupa.png"></button>
            <button class="btn-ordenar-crescente" onclick="ordenarAlfabetico(this, 'crescente')">AZ</button>
            <button class="btn-ordenar-decrescente" onclick="ordenarAlfabetico(this, 'decrescente')">ZA</button>
        </div>
        <span class="btn-inserir-direita" onclick="inserirNovaColuna(this, 'right')">></span>
    </div>
    <div class="selectAtual">
        <select id="tipoCliente">
            <option value="nome">nome</option>
            <option value="telefone">telefone</option>
            <option value="cpf_cnpj">cpf_cnpj</option>
            <option value="data_nascimento">data_nascimento</option>
            <option value="genero">genero</option>
            <option value="email">email</option>
            <option value="anotacao">anotacao</option>
            <option value="DDD">DDD</option>
        </select>
    </div>`;

const tableRemoveRowHTML = `<span class="btn-remove" onclick="removeRow(this)">X</span>`;

const tipoCliente = `
    <select id="tipoCliente">
        <option value="nome">nome</option>
        <option value="telefone">telefone</option>
        <option value="cpf_cnpj">cpf_cnpj</option>
        <option value="data_nascimento">data_nascimento</option>
        <option value="genero">genero</option>
        <option value="email">email</option>
        <option value="anotacao">anotacao</option>
        <option value="DDD">DDD</option>
    </select>`;

const tipoLancamento = `
    <select id="tipoLancamento">
        <option value="nome">cliente_nome</option>
        <option value="telefone">cliente_telefone</option>
        <option value="cpf_cnpj">cliente_cpf_cnpj</option>
        <option value="valor_venda">valor_venda</option>
        <option value="valor_resgate">valor_resgate</option>
        <option value="anotacao">anotacao_venda</option>
        <option value="item_venda">item_venda</option>
        <option value="data_lancamento">data_lancamento</option>
        <option value="nome_vendedor">nome_vendedor</option>
        <option value="codigo_vendedor">codigo_vendedor</option>
        <option value="DDD">DDD</option>
    </select>`;

const tipoOportunidade = `
    <select id="tipoOportunidade">
        <option value="nome">nome</option>
        <option value="telefone">telefone</option>
        <option value="cpf_cnpj">cpf_cnpj</option>
        <option value="data_nascimento">data_nascimento</option>
        <option value="genero">genero</option>
        <option value="email">email</option>
        <option value="anotacao">anotacao</option>
        <option value="DDD">DDD</option>
        <option value="bonus_valor">bonus_valor</option>
        <option value="bonus_validade">bonus_validade</option>
    </select>`;

const tipoProdutos = `
    <select id="tipoProdutos">
        <option value="codigo">codigo</option>
        <option value="nome">nome</option>
        <option value="percentual">percentual</option>
        <option value="validade">validade</option>
    </select>`;