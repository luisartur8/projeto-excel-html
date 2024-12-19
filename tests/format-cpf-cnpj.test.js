import { describe, test, expect } from 'vitest';
import { corrigirCpf_cnpj } from './validacao.js';

describe('Função corrigirCpf_cnpj', () => {

    test('Tamanho correto', () => {
        const documento1 = '111.111.111-11';
        const documento2 = '000.000.000-000';
        const documento3 = '45442988308';

        const valueFormmated1 = String(corrigirCpf_cnpj(documento1));
        const valueFormmated2 = String(corrigirCpf_cnpj(documento2));
        const valueFormmated3 = String(corrigirCpf_cnpj(documento3));

        expect(valueFormmated1).toBe(('111.111.111-11'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('454.429.883-08'));

    })

    test('É valido', () => {

        const documento1 = '454.429.883-08';
        const documento2 = '000.000.000-000';

        const valueFormmated1 = String(corrigirCpf_cnpj(documento1));
        const valueFormmated2 = String(corrigirCpf_cnpj(documento2));

        expect(valueFormmated1).toBe(('454.429.883-08'));
        expect(valueFormmated2).toBe((''));
    })

    test('Diferencia entre cpf e cnpj e aplica mascara', () => {

        const documento1 = '45442988308';
        const documento2 = '13407099000192';

        const valueFormmated1 = String(corrigirCpf_cnpj(documento1));
        const valueFormmated2 = String(corrigirCpf_cnpj(documento2));

        expect(valueFormmated1).toBe(('454.429.883-08'));
        expect(valueFormmated2).toBe(('13.407.099/0001-92'));
    })

    test('Adiciona zeros a esquerda', () => {

        const documento1 = '12.345.678-90';
        const documento2 = '4.231.574/0001-21';

        const valueFormmated1 = String(corrigirCpf_cnpj(documento1));
        const valueFormmated2 = String(corrigirCpf_cnpj(documento2));

        expect(valueFormmated1).toBe(('012.345.678-90'));
        expect(valueFormmated2).toBe(('04.231.574/0001-21'));
    })

})
