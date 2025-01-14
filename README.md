# str-case-converter

A lightweight utility for converting strings between different case formats. Automatically detects input case format or lets you specify it explicitly.

## Installation

```bash
npm install str-case-converter
```

## Usage

```javascript
import { convertString } from 'str-case-converter';

// Basic usage (auto-detects source case)
convertString.toCamel('hello-world'); // 'helloWorld'
convertString.toSnake('helloWorld'); // 'hello_world'
convertString.toPascal('hello_world'); // 'HelloWorld'
convertString.toKebab('HelloWorld'); // 'hello-world'
convertString.toConstant('helloWorld'); // 'HELLO_WORLD'
convertString.toTitle('hello-world'); // 'Hello World'

// Specify source case for better performance
convertString.toCamel('hello-world', 'kebab'); // 'helloWorld'
convertString.toSnake('foo-bar', 'kebab'); // 'foo_bar'

// Utility methods
convertString.detect('helloWorld'); // 'camel'
convertString.toArray('hello-world'); // ['hello', 'world']
```

## Supported Cases

-   `camelCase`: 'helloWorld'
-   `PascalCase`: 'HelloWorld'
-   `snake_case`: 'hello_world'
-   `kebab-case`: 'hello-world'
-   `CONSTANT_CASE`: 'HELLO_WORLD'
-   `Title Case`: 'Hello World'

## Features

-   Auto-detection of input case format
-   Optional source case specification
-   Handles mixed cases and unknown formats
-   No dependencies
-   Lightweight and efficient
-   ESM support

## API

### Main Methods

All conversion methods accept two parameters:

-   `str: string` - The string to convert
-   `sourceCase?: string` - Optional source case type for better performance

```javascript
convertString.toCamel(str, sourceCase?)    // Converts to camelCase
convertString.toPascal(str, sourceCase?)   // Converts to PascalCase
convertString.toSnake(str, sourceCase?)    // Converts to snake_case
convertString.toKebab(str, sourceCase?)    // Converts to kebab-case
convertString.toConstant(str, sourceCase?) // Converts to CONSTANT_CASE
convertString.toTitle(str, sourceCase?)    // Converts to Title Case
```

### Utility Methods

```javascript
convertString.detect(str); // Returns the case type or null if unknown
convertString.toArray(str); // Converts string to array of words
```

## Performance Tips

-   If you know the source case format, provide it as the second parameter to skip case detection
-   When converting multiple strings of the same format, destructure the method you need:
    ```javascript
    const { toCamel } = convertString;
    ['hello-world', 'foo-bar'].map((str) => toCamel(str, 'kebab'));
    ```

## License

MIT

## Issues

If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/Julien-Ba/str-case-converter/issues).
