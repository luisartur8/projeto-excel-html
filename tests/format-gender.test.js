import { describe, test, expect } from 'vitest';
import { corrigirGenero } from './validacao.js';

describe('Função corrigirGenero', () => {

    test('Genero para UpperCase', () => {
        const documento1 = 'm';
        const documento2 = 'f';

        const valueFormmated1 = String(corrigirGenero(documento1));
        const valueFormmated2 = String(corrigirGenero(documento2));

        expect(valueFormmated1).toBe(('M'));
        expect(valueFormmated2).toBe(('F'));

    })

    test('Mais de um caracter com genero obvio', () => {
        const documento1 = 'mu';
        const documento2 = 'mulher';
        const documento3 = 'fe';
        const documento4 = 'feminino';

        const documento5 = 'ma';
        const documento6 = 'masculino';
        const documento7 = 'ho';
        const documento8 = 'homem';

        const valueFormmated1 = String(corrigirGenero(documento1));
        const valueFormmated2 = String(corrigirGenero(documento2));
        const valueFormmated3 = String(corrigirGenero(documento3));
        const valueFormmated4 = String(corrigirGenero(documento4));

        const valueFormmated5 = String(corrigirGenero(documento5));
        const valueFormmated6 = String(corrigirGenero(documento6));
        const valueFormmated7 = String(corrigirGenero(documento7));
        const valueFormmated8 = String(corrigirGenero(documento8));

        expect(valueFormmated1).toBe(('F'));
        expect(valueFormmated2).toBe(('F'));
        expect(valueFormmated3).toBe(('F'));
        expect(valueFormmated4).toBe(('F'));

        expect(valueFormmated5).toBe(('M'));
        expect(valueFormmated6).toBe(('M'));
        expect(valueFormmated7).toBe(('M'));
        expect(valueFormmated8).toBe(('M'));

    })

    test('Casos não validos', () => {
        const documento1 = 'menino';
        const documento2 = 'menina';
        const documento3 = 'j';

        const valueFormmated1 = String(corrigirGenero(documento1));
        const valueFormmated2 = String(corrigirGenero(documento2));
        const valueFormmated3 = String(corrigirGenero(documento3));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe((''));

    }) 

})