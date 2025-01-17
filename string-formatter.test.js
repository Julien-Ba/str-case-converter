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

        test('detects no case', () => {
            expect(convertString.detect('hello world')).toBe('no');
        });

        test('detects Sentence case', () => {
            expect(convertString.detect('Hello world')).toBe('sentence');
        });

        test('detects path/case', () => {
            expect(convertString.detect('hello/world')).toBe('path');
        });

        test('returns null for unknown format', () => {
            expect(convertString.detect('hello.WORLD_foo-bar')).toBe(null);
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

        test('converts to dot.case', () => {
            expect(convertString.toDot('hello_world')).toBe('hello.world');
            expect(convertString.toDot('Hello World')).toBe('hello.world');
            expect(convertString.toDot('HelloWorld', 'pascal')).toBe('hello.world');
        });

        test('converts to no case', () => {
            expect(convertString.toNo('hello-world')).toBe('hello world');
            expect(convertString.toNo('hello/world')).toBe('hello world');
            expect(convertString.toNo('Hello world', 'sentence')).toBe('hello world');
        });

        test('converts to Sentence case', () => {
            expect(convertString.toSentence('HELLO_WORLD')).toBe('Hello world');
            expect(convertString.toSentence('hello.world')).toBe('Hello world');
            expect(convertString.toSentence('hello world', 'no')).toBe('Hello world');
        });

        test('converts to path/case', () => {
            expect(convertString.toPath('helloWorld')).toBe('hello/world');
            expect(convertString.toPath('hello world')).toBe('hello/world');
            expect(convertString.toPath('Hello World', 'title')).toBe('hello/world');
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
            expect(convertString.toCamel({})).toBe('[objectObject]');
            expect(convertString.toDot([])).toBe('');
            expect(convertString.toConstant(function () {})).toBe('FUNCTION_()_{}');
            expect(convertString.toArray(() => {})).toEqual(['()', '=>', '{}']);
            expect(convertString.toSnake(convertString.toCamel('hello world'))).toBe('hello_world');
        });

        test('handles mixed formats', () => {
            const mixed = 'hello.WORLD_foo-bar';
            const expected = ['hello', 'world', 'foo', 'bar'];
            expect(convertString.toArray(mixed)).toEqual(expected);
            expect(convertString.toArray('openAI_WHO')).toEqual(['open', 'ai', 'who']);
            expect(
                convertString.toSnake(
                    'If I useTitle-case as an argument, it will only remove spaces/uppercases',
                    'title'
                )
            ).toBe('if_i_usetitle-case_as_an_argument,_it_will_only_remove_spaces/uppercases');
        });

        test('handle unknown cases', () => {
            expect(convertString.toTitle('hello_world', 'yolo')).toBe('Hello World');
            expect(convertString.detect('HELLO_WORLD', 'TPPI')).toBe('constant');
            expect(convertString.toCamel('AR3_y0u-GONNA break Yet?', null)).toBe(
                'ar3Y0uGonnaBreakYet?'
            );
            expect(convertString.toConstant(undefined, {})).toBe('UNDEFINED');
            expect(convertString.toNo('', '')).toBe('');
        });
    });
});
