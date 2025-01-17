type CaseType =
    | 'camel'
    | 'pascal'
    | 'snake'
    | 'kebab'
    | 'constant'
    | 'title'
    | 'dot'
    | 'no'
    | 'sentence'
    | 'path';

interface ConvertString {
    /**
     * Converts a string to camelCase
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toCamel(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to PascalCase
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toPascal(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to snake_case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toSnake(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to kebab-case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toKebab(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to CONSTANT_CASE
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toConstant(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to Title Case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toTitle(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to dot.case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toDot(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to no case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toNo(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to Sentence case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toSentence(str: string, sourceCase?: CaseType): string;

    /**
     * Converts a string to path/case
     * @param str - The string to convert
     * @param sourceCase - Optional source case type
     */
    toPath(str: string, sourceCase?: CaseType): string;

    /**
     * Detects the case type of a string
     * @param str - The string to analyze
     */
    detect(str: string): CaseType | null;

    /**
     * Converts a string to an array of words
     * @param str - The string to convert
     */
    toArray(str: string): string[];

    /**
     * Capitalize the first letter of a word
     * @param str - The string to convert
     */
    capitalize(str: string): string;
}

export const convertString: ConvertString;
