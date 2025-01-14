import { convertString } from './index.js';

describe('convertString', () => {
    describe('Case Detection', () => {
        test('detects camelCase', () => {
            expect(convertString.detect('helloWorld')).toBe('camel');
        });

        test('detects PascalCase', () => {
            expect(convertString.detect('HelloWorld')).toBe('pascal');
        });

        test('detects snake_case', () => {
            expect(convertString.detect('hello_world')).toBe('snake');
        });

        test('detects kebab-case', () => {
            expect(convertString.detect('hello-world')).toBe('kebab');
        });

        test('detects CONSTANT_CASE', () => {
            expect(convertString.detect('HELLO_WORLD')).toBe('constant');
        });

        test('detects Title Case', () => {
            expect(convertString.detect('Hello World')).toBe('title');
        });

        test('detects dot.case', () => {
            expect(convertString.detect('hello.world')).toBe('dot');
        });

        test('returns null for unknown format', () => {
            expect(convertString.detect('hello.WORLD_stuff-things')).toBe(null);
        });
    });

    describe('Conversions', () => {
        test('converts to camelCase', () => {
            expect(convertString.toCamel('hello-world')).toBe('helloWorld');
            expect(convertString.toCamel('HELLO_WORLD')).toBe('helloWorld');
            expect(convertString.toCamel('Hello World', 'title')).toBe('helloWorld');
        });

        test('converts to PascalCase', () => {
            expect(convertString.toPascal('hello-world')).toBe('HelloWorld');
            expect(convertString.toPascal('hello_world')).toBe('HelloWorld');
            expect(convertString.toPascal('helloWorld', 'camel')).toBe('HelloWorld');
        });

        test('converts to snake_case', () => {
            expect(convertString.toSnake('helloWorld')).toBe('hello_world');
            expect(convertString.toSnake('Hello World')).toBe('hello_world');
            expect(convertString.toSnake('hello-world', 'kebab')).toBe('hello_world');
        });

        test('converts to kebab-case', () => {
            expect(convertString.toKebab('helloWorld')).toBe('hello-world');
            expect(convertString.toKebab('Hello World')).toBe('hello-world');
            expect(convertString.toKebab('hello_world', 'snake')).toBe('hello-world');
        });

        test('converts to CONSTANT_CASE', () => {
            expect(convertString.toConstant('helloWorld')).toBe('HELLO_WORLD');
            expect(convertString.toConstant('hello-world')).toBe('HELLO_WORLD');
            expect(convertString.toConstant('hello.world', 'dot')).toBe('HELLO_WORLD');
        });

        test('converts to Title Case', () => {
            expect(convertString.toTitle('helloWorld')).toBe('Hello World');
            expect(convertString.toTitle('hello-world')).toBe('Hello World');
            expect(convertString.toTitle('HELLO_WORLD', 'constant')).toBe('Hello World');
        });

        test('converts to Dot Case', () => {
            expect(convertString.toDot('hello_world')).toBe('hello.world');
            expect(convertString.toDot('Hello World')).toBe('hello.world');
            expect(convertString.toDot('HelloWorld', 'pascal')).toBe('hello.world');
        });
    });

    describe('Edge Cases', () => {
        test('handles empty string', () => {
            expect(convertString.toCamel('')).toBe('');
            expect(convertString.toSnake('')).toBe('');
        });

        test('handles non-string inputs', () => {
            expect(convertString.toKebab(123)).toBe('123');
            expect(convertString.toTitle(null)).toBe('Null');
            expect(convertString.toPascal(undefined)).toBe('Undefined');
        });

        test('handles mixed formats', () => {
            const mixed = 'hello.WORLD_stuff-things';
            const expected = ['hello', 'world', 'stuff', 'things'];
            expect(convertString.toArray(mixed)).toEqual(expected);
            expect(convertString.toArray('openAI_WHO')).toEqual(['open', 'ai', 'who']);
        });
    });
});
