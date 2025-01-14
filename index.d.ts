type CaseType = 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant' | 'title' | 'dot';

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
     * Detects the case type of a string
     * @param str - The string to analyze
     */
    detect(str: string): CaseType | null;

    /**
     * Converts a string to an array of words
     * @param str - The string to convert
     */
    toArray(str: string): string[];
}

export const convertString: ConvertString;
