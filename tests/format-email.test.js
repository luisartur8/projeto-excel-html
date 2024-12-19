import { describe, test, expect } from 'vitest';
import { corrigirEmail } from './validacao.js';

describe('Função corrigirEmail', () => {

    test('Remove espaços nas laterais e verifica "@"', () => {
        const documento1 = '  email@hotmail.com  ';
        const documento2 = 'e@mail@hotmail.com';
        const documento3 = '@emailhotmail.com';
        const documento4 = 'emailhotmailcom@';

        const valueFormmated1 = String(corrigirEmail(documento1));
        const valueFormmated2 = String(corrigirEmail(documento2));
        const valueFormmated3 = String(corrigirEmail(documento3));
        const valueFormmated4 = String(corrigirEmail(documento4));

        expect(valueFormmated1).toBe(('email@hotmail.com'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe((''));
        expect(valueFormmated4).toBe((''));

    })

    test('Comprimento minimo e máximo', () => {
        const documento1 = 'a@b.com';
        const documento2 = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@b.com';

        const valueFormmated1 = String(corrigirEmail(documento1));
        const valueFormmated2 = String(corrigirEmail(documento2));

        expect(valueFormmated1).toBe(('a@b.com'));
        expect(valueFormmated2).toBe((''));
    })

    test('Regex email', () => {
        const documento1 = 'aa__aa@email.com';
        const documento2 = 'usuario@dominio-';
        const documento3 = 'teste@dominio..com';
        const documento4 = 'exemplo@dominio@com';

        const valueFormmated1 = String(corrigirEmail(documento1));
        const valueFormmated2 = String(corrigirEmail(documento2));
        const valueFormmated3 = String(corrigirEmail(documento3));
        const valueFormmated4 = String(corrigirEmail(documento4));

        expect(valueFormmated1).toBe('');
        expect(valueFormmated2).toBe('');
        expect(valueFormmated3).toBe('');
        expect(valueFormmated4).toBe('');
    })

})