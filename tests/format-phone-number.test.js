import { describe, test, expect } from 'vitest';
import { corrigirTelefone, corrigirTelefoneSemDDD } from './validacao';

describe('Função corrigirTelefone', () => {
    test('Se tem + tira o que não for nacional (+55)', () => {
        const telefone1 = '+55 48 988888888';
        const telefone2 = '+54 48 988888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": '48'}));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, {"value": '48'}));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe((''));
    })

    test('Não confundir +55 com DDD 55', () => {
        const telefone1 = '+55 48 988888888';
        const telefone2 = '+55 988888888';
        const telefone3 = '55 988888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": '48'}));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, {"value": '48'}));
        const valueFormmated3 = String(corrigirTelefone(telefone3, true, {"value": '48'}));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('(55) 98888-8888'));
    })

    test('Inserir o DDD do input corretamente', () => {
        const telefone1 = '11 988888888';
        const telefone2 = '988888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": '48'}));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, {"value": '48'}));

        expect(valueFormmated1).toBe(('(11) 98888-8888'));
        expect(valueFormmated2).toBe(('(48) 98888-8888'));
    })

    test('Tamanho correto', () => {
        const telefone1 = '8888 8888';
        const telefone2 = '8 55 11 98888 8888';
        const telefone3 = '055 11 98888 8888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": ''}));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, {"value": ''}));
        const valueFormmated3 = String(corrigirTelefone(telefone3, true, {"value": ''}));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('(11) 98888-8888'));
    })

    test('Adicionando o 9 extra', () => {
        const telefone1 = '8888 8888';
        const telefone2 = '48 88888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": '48'}));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, {"value": ''}));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe(('(48) 98888-8888'));
    })

    test('Tamanho correto com DDD retornando telefone formatado passando o DDD tipo String', () => {
        const telefone1 = '88888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": '48'}));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
    })

    test('Tamanho correto com DDD retornando telefone formatado passando o DDD tipo Number', () => {
        const telefone1 = '88888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, {"value": 48}));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
    })
})

describe('Função corrigirTelefoneSemDDD', () => {
    test('Tamanho correto (8 ou 9)', () => {
        const tamanhoNove = '988888888';
        const tamanhoOito = '88888888';

        const tamanhoDez = '8888888888';
        const tamanhoSete = '7777777';

        const valueFormmated1 = String(corrigirTelefoneSemDDD(tamanhoNove));
        const valueFormmated2 = String(corrigirTelefoneSemDDD(tamanhoOito));
        const valueFormmated3 = String(corrigirTelefoneSemDDD(tamanhoDez));
        const valueFormmated4 = String(corrigirTelefoneSemDDD(tamanhoSete));

        expect(valueFormmated1).toBe(('988888888'));
        expect(valueFormmated2).toBe(('988888888')); // Adiciona 9
        expect(valueFormmated3).toBe((''));
        expect(valueFormmated4).toBe((''));
    })

    test('Contém o 9 extra na frente, ou adiciona caso não tenha', () => {
        const contemNove = '988888888';
        const contemOito = '888888888';
        const naoContem = '77777777';

        const valueFormmated1 = String(corrigirTelefoneSemDDD(contemNove));
        const valueFormmated2 = String(corrigirTelefoneSemDDD(contemOito));
        const valueFormmated3 = String(corrigirTelefoneSemDDD(naoContem));

        expect(valueFormmated1).toBe(('988888888'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('977777777'));

    })

    test('Conferir se o numero após o 9 extra é 9 ou 8', () => {
        const telefone1 = '9 9888 8888';
        const telefone2 = '9 8888 8888';
        const telefone3 = '9 7888 8888';

        const valueFormmated1 = String(corrigirTelefoneSemDDD(telefone1));
        const valueFormmated2 = String(corrigirTelefoneSemDDD(telefone2));
        const valueFormmated3 = String(corrigirTelefoneSemDDD(telefone3));

        expect(valueFormmated1).toBe(('998888888'));
        expect(valueFormmated2).toBe(('988888888'));
        expect(valueFormmated3).toBe((''));

    })
})