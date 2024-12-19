import { describe, test, expect } from 'vitest';
import { formatPurchase } from './format-purchase.util';
import { corrigirCodigo } from '../js/validacao';

describe('Format Value Purchase', () => {
    test('Formata o valor que contem somente o "."', () => {
        const value = '1591';

        const valueFormmated = Number(corrigirCodigo(value));

        console.log(valueFormmated);
        expect(valueFormmated).toBe(1591);
    })

    test('Formata o valor que contem somente o ","', () => {
        const value = '1591,89';

        const valueFormmated = Number(formatPurchase(value));

        console.log(valueFormmated)

        expect(valueFormmated).toBe(1591.89);
    })

    test('Formata o valor que contem "." e ","', () => {
        const value = '1.591,89';

        const valueFormmated = Number(formatPurchase(value));

        console.log(valueFormmated)

        expect(valueFormmated).toBe(1591.89);
    })

    test('Formata o valor que contem "," e "."', () => {
        const value = '1,591.89';

        const valueFormmated = Number(formatPurchase(value));

        console.log(valueFormmated)

        expect(valueFormmated).toBe(1591.89);
    })

    test('Formata o valor que contem "R$", "." e ","', () => {
        const value = 'R$ 1.591,89';

        const valueFormmated = Number(formatPurchase(value));

        console.log(valueFormmated)

        expect(valueFormmated).toBe(1591.89);
    })

    test('Formata o valor que não contem "." ou "," que está no tipo string', () => {
        const value = '159';

        const valueFormmated = Number(formatPurchase(value));

        console.log(valueFormmated)

        expect(valueFormmated).toBe(1.59);
    })
    
    test('Formata o valor que não contem "." ou "," que está no tipo number', () => {
        const value = 159;

        const valueFormmated = Number(formatPurchase(value));

        console.log(valueFormmated)

        expect(valueFormmated).toBe(159);
    })

    test('Formata o valor que contem "." que está no tipo number', () => {
        const value = 1591.89;

        const valueFormmated = Number(formatPurchase(value));

        expect(valueFormmated).toBe(1591.89);
    })
})