/**
 * Utility for converting strings between different case formats.
 *
 * @supported Case Types
 * - camelCase:  'helloWorld'
 * - PascalCase: 'HelloWorld'
 * - snake_case: 'hello_world'
 * - kebab-case: 'hello-world'
 * - CONSTANT_CASE: 'HELLO_WORLD'
 * - Title Case: 'Hello World'
 * - dot.case: 'hello.world'
 *
 * @example
 * // Basic usage (auto-detects source case)
 * convertString.toCamel('hello-world')  // 'helloWorld'
 * convertString.toSnake('helloWorld')   // 'hello_world'
 *
 * // With source case parameter for better performance
 * convertString.toCamel('Hello World', 'title')    // 'helloWorld'
 * convertString.toSnake('HelloWorld', 'pascal')    // 'foo_bar'
 *
 * // Utility methods
 * convertString.detect('helloWorld')     // 'camel'
 * convertString.toArray('hello-world')   // ['hello', 'world']
 */

const CASE_TYPES = {
    CAMEL: 'camel',
    PASCAL: 'pascal',
    SNAKE: 'snake',
    KEBAB: 'kebab',
    CONSTANT: 'constant',
    TITLE: 'title',
    DOT: 'dot',
};

/**
 * Detects the case type of a given string
 * @param {string} str - Input string
 * @returns {string|null} Detected case type or null if unknown
 */
function detectCase(str) {
    if (/^[a-z]+[A-Z][a-zA-Z0-9]*$/.test(str)) return CASE_TYPES.CAMEL;
    if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) return CASE_TYPES.PASCAL;
    if (/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/.test(str)) return CASE_TYPES.SNAKE;
    if (/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(str)) return CASE_TYPES.KEBAB;
    if (/^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/.test(str)) return CASE_TYPES.CONSTANT;
    if (/^[a-z][a-z0-9]*(\.[a-z0-9]+)*$/.test(str)) return CASE_TYPES.DOT;
    if (/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(str)) return CASE_TYPES.TITLE;
    return null;
}

/**
 * Splits a string into an array of words based on its case type
 * @param {string} str - Input string
 * @param {string} sourceCase - Source case type
 * @returns {string[]} Array of words
 */
function splitIntoWords(str, sourceCase) {
    switch (sourceCase) {
        case CASE_TYPES.CAMEL:
        case CASE_TYPES.PASCAL:
            return str
                .replace(/(?<![A-Z])([A-Z])/g, ' $1')
                .replace(/(?<![0-9])([0-9])/g, ' $1')
                .trim()
                .toLowerCase()
                .split(' ')
                .filter(Boolean);

        case CASE_TYPES.SNAKE:
        case CASE_TYPES.CONSTANT:
            return str.toLowerCase().split('_').filter(Boolean);

        case CASE_TYPES.KEBAB:
            return str.split('-').filter(Boolean);

        case CASE_TYPES.DOT:
            return str.split('.').filter(Boolean);

        case CASE_TYPES.TITLE:
            return str.toLowerCase().split(' ').filter(Boolean);

        default:
            return str
                .replace(/(?<![A-Z])([A-Z])/g, ' $1')
                .replace(/(?<![0-9])([0-9])/g, ' $1')
                .replace(/[-_\.]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .toLowerCase()
                .split(' ')
                .filter(Boolean);
    }
}

/**
 * Converts a string to an array of words regardless of its original case
 * @param {string} str - Input string
 * @param {string} [sourceCase] - Optional source case type for better performance
 *                               ('camel', 'pascal', 'snake', 'kebab', 'constant', 'title', 'dot')
 * @returns {string[]} Array of words
 */
function convertToArray(str, sourceCase) {
    str = String(str);
    return splitIntoWords(str, sourceCase || detectCase(str));
}

/**
 * String conversion utility object with methods for each case type
 */
export const convertString = {
    toCamel: (str, sourceCase) => {
        return convertToArray(str, sourceCase)
            .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
            .join('');
    },
    toPascal: (str, sourceCase) => {
        return convertToArray(str, sourceCase)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    },
    toSnake: (str, sourceCase) => {
        return convertToArray(str, sourceCase).join('_');
    },
    toKebab: (str, sourceCase) => {
        return convertToArray(str, sourceCase).join('-');
    },
    toConstant: (str, sourceCase) => {
        return convertToArray(str, sourceCase).join('_').toUpperCase();
    },
    toTitle: (str, sourceCase) => {
        return convertToArray(str, sourceCase)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    toDot: (str, sourceCase) => {
        return convertToArray(str, sourceCase).join('.');
    },
    detect: detectCase,
    toArray: convertToArray,
};
