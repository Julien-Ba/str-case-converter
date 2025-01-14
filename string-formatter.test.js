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

        test('returns null for unknown format', () => {
            expect(convertString.detect('hello.WORLD_stuff-things')).toBe(null);
        });
    });

    describe('Conversions', () => {
        const testString = 'hello world';

        test('converts to camelCase', () => {
            expect(convertString.toCamel('hello-world')).toBe('helloWorld');
            expect(convertString.toCamel('HELLO_WORLD')).toBe('helloWorld');
            expect(convertString.toCamel('Hello World')).toBe('helloWorld');
        });

        test('converts to PascalCase', () => {
            expect(convertString.toPascal('hello-world')).toBe('HelloWorld');
            expect(convertString.toPascal('hello_world')).toBe('HelloWorld');
            expect(convertString.toPascal('helloWorld')).toBe('HelloWorld');
        });

        test('converts to snake_case', () => {
            expect(convertString.toSnake('helloWorld')).toBe('hello_world');
            expect(convertString.toSnake('hello-world')).toBe('hello_world');
            expect(convertString.toSnake('Hello World')).toBe('hello_world');
        });

        test('converts to kebab-case', () => {
            expect(convertString.toKebab('helloWorld')).toBe('hello-world');
            expect(convertString.toKebab('hello_world')).toBe('hello-world');
            expect(convertString.toKebab('Hello World')).toBe('hello-world');
        });

        test('converts to CONSTANT_CASE', () => {
            expect(convertString.toConstant('helloWorld')).toBe('HELLO_WORLD');
            expect(convertString.toConstant('hello-world')).toBe('HELLO_WORLD');
            expect(convertString.toConstant('Hello World')).toBe('HELLO_WORLD');
        });

        test('converts to Title Case', () => {
            expect(convertString.toTitle('helloWorld')).toBe('Hello World');
            expect(convertString.toTitle('hello-world')).toBe('Hello World');
            expect(convertString.toTitle('hello_world')).toBe('Hello World');
        });
    });

    describe('Edge Cases', () => {
        test('handles empty string', () => {
            expect(convertString.toCamel('')).toBe('');
            expect(convertString.toSnake('')).toBe('');
        });

        test('handles non-string inputs', () => {
            expect(convertString.toCamel(123)).toBe('123');
            expect(convertString.toSnake(null)).toBe('null');
            expect(convertString.toPascal(undefined)).toBe('undefined');
        });

        test('handles mixed formats', () => {
            const mixed = 'hello.WORLD_stuff-things';
            const expected = ['hello', 'world', 'stuff', 'things'];
            expect(convertString.toArray(mixed)).toEqual(expected);
        });
    });

    describe('Source Case Specification', () => {
        test('uses specified source case', () => {
            expect(convertString.toCamel('hello-world', 'kebab')).toBe('helloWorld');
            expect(convertString.toSnake('HelloWorld', 'pascal')).toBe('hello_world');
        });
    });
});
