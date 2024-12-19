import { describe, test, expect } from 'vitest';
import { corrigirData_nascimento } from './validacao.js';

describe('Função corrigirData_nascimento', () => {

    test('Substituição por barra', () => {
        const documento1 = '20-10-2024';
        const documento2 = '20;10;2024';
        const documento3 = '20/10/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024'));
        expect(valueFormmated2).toBe(('20/10/2024'));
        expect(valueFormmated3).toBe(('20/10/2024'));

    })

    test('Tem duas barras', () => {
        const documento1 = '20/10/2024';
        const documento2 = '20/10';
        const documento3 = '20/10/20/24';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe((''));
    })

    test('Adiciona um zero na frente caso não tenha', () => {
        const documento1 = '2/1/2024';
        const documento2 = '1/2/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'mm/dd/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('02/01/2024'));
        expect(valueFormmated2).toBe(('02/01/2024'));
    })

    test('Dia no intervalo correto', () => {
        // Dia
        const documento1 = '32/01/2024';
        const documento2 = '31/01/2024';
        const documento3 = '00/01/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe(('31/01/2024'));
        expect(valueFormmated3).toBe((''));
    })

    test('Mês no intervalo correto', () => {
        // Mês
        const documento1 = '01/13/2024';
        const documento2 = '01/12/2024';
        const documento3 = '01/00/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe(('01/12/2024'));
        expect(valueFormmated3).toBe((''));
    })

    test('Ano de 4 digitos no intervalo correto', () => {
        // Ano (yyyy)
        const anoAtual = new Date().getFullYear();

        const documento1 = '01/01/1900';
        const documento2 = '01/01/1899';
        const documento3 = `01/01/${anoAtual}`;
        const documento4 = `01/01/${anoAtual + 1}`;

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated4 = String(corrigirData_nascimento(documento4, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('01/01/1900'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe((`01/01/${anoAtual}`));
        expect(valueFormmated4).toBe((''));
    })

    test('Formatando ano de 2 digitos em 4 digitos', () => {
        // Ano (yy)
        // Exemplo:
        // 01/01/25 -> 01/01/1925
        // 01/01/24 -> 01/01/2024
        const anoAtual = String(new Date().getFullYear()).slice(2);

        const documento1 = `01/01/${Number(anoAtual) + 1}`;
        const documento2 = `01/01/${anoAtual}`;

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((`01/01/19${Number(anoAtual) + 1}`));
        expect(valueFormmated2).toBe((`01/01/20${anoAtual}`));

    })

    test('Todas as combinações possiveis', () => {



    })

})