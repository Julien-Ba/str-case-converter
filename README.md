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
convertString.toDot('Hello World'); // 'hello.world'
convertString.toNo('helloWorld'); // 'hello world'
convertString.toSentence('hello_world'); // 'Hello world'
convertString.toPath('Hello World'); // 'hello/world'

// Utility methods
convertString.detect('helloWorld'); // 'camel'
convertString.toArray('hello-world'); // ['hello', 'world']
convertString.capitalize('hello'); // 'Hello'

// Specify source case for better performance/control
convertString.toCamel('hello-world', 'kebab'); // 'helloWorld'
convertString.toSnake('hello-world', 'kebab'); // 'hello_world'
```

## Supported Cases

-   `camelCase`: 'helloWorld'
-   `PascalCase`: 'HelloWorld'
-   `snake_case`: 'hello_world'
-   `kebab-case`: 'hello-world'
-   `CONSTANT_CASE`: 'HELLO_WORLD'
-   `Title Case`: 'Hello World'
-   `dot.case`: 'hello.world'
-   `no case`: 'hello world'
-   `Sentence case`: 'Hello world'
-   `path/case`: 'hello/world'

## Features

-   Auto-detection of input case format
-   Optional source case specification
-   Handles mixed cases, unknown formats and non string types
-   No dependencies
-   Lightweight and efficient
-   ESM support

## API

### Main Methods

All conversion methods accept two parameters:

-   `str: string` - The string to convert
-   `sourceCase?: string` - Optional source case type for better performance/control

```javascript
convertString.toCamel(str, sourceCase?)     // Converts to camelCase
convertString.toPascal(str, sourceCase?)    // Converts to PascalCase
convertString.toSnake(str, sourceCase?)     // Converts to snake_case
convertString.toKebab(str, sourceCase?)     // Converts to kebab-case
convertString.toConstant(str, sourceCase?)  // Converts to CONSTANT_CASE
convertString.toTitle(str, sourceCase?)     // Converts to Title Case
convertString.toDot(str, sourceCase?)       // Converts to dot.case
convertString.toNo(str, sourceCase?)        // Converts to no case
convertString.toSentence(str, sourceCase?)  // Converts to Sentence case
convertString.toPath(str, sourceCase?)      // Converts to path/case
```

### Utility Methods

```javascript
convertString.detect(str); // Returns the case type or null if unknown
convertString.toArray(str); // Converts string to array of words
convertString.capitalize(str); // Capitalize the first character
```

## Tips

-   You can destructure the method you need to avoid calling the object.
-   Ultimately, you can pass anything you want as arguments.
-   The first argument will always be converted into a string.
-   The second argument will allow you to skip the detect function no matter what and will be compared to valid case names

````javascript
// destructuring
const { toCamel } = convertString;
['hello-world', 'foo-bar'].map((str) => toCamel(str));

// using unknown case format
toCamel('AR3_y0u-GONNA break Yet?', null); // 'ar3Y0uGonnaBreakYet?'

// converting other types
convertString.toConstant(undefined, {}); // 'UNDEFINED'

// control the output with the case format
convertString.toSnake('If I useTitle-case as an argument, it will only remove spaces/uppercases', 'title');
// if_i_usetitle-case_as_an_argument,_it_will_only_remove_spaces/uppercases
```

## License

MIT

## Issues

If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/Julien-Ba/str-case-converter/issues).
````
