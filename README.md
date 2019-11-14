# parse-ssn

Tiny utils to handle formatting, masking, and validating of US Social Security
numbers. **400 bytes gzipped.**

```bash
npm i parse-ssn --save
```

## Usage

`parse-ssn` includes four utilities: `mask`, `format`, `validate`, and `clean`.

The library defaults to using `*` as a number placeholder, and `-` as a separator. To
mask and format other variations, pass additional optional props.

### `mask`

Signature: `mask(value: string, placeholder = '*'): string`

```javascript
import { mask } from "parse-ssn";

format("123121234"); // => *****1234
format("123121234", "#"); // => #####1234
```

### `format`

Signature: `format(value: string, separator = '-', existingPlaceholder = '*'):
string`

```javascript
import { format } from "parse-ssn";

format("123121234"); // => 123-12-1234
format("123121234", " "); // => 123 12 1234
```

```javascript
import { format, mask } from "parse-ssn";

const masked = mask("123121234"); // => *****1234
const formatted = format(masked); // => ***-**-1234
```

When dealing with formatting of masks that use a placeholder other than `*`, you
need to pass additional information about the format.

```javascript
import { format } from "parse-ssn";

format("#####1234", "-", "#"); // => ###-##-1234
```

### `validate`

Signature: `validate(value: string): boolean`

Validation is based on information gathered from the [Social Security
Administration's website](https://www.ssa.gov/employer/stateweb.htm). If an edge
case is missing, please open an issue.

```javascript
import { validate } from "parse-ssn";

validate("123121234"); // => true
validate("12312123"); // => false
validate("1231212345"); // => false
```

### `clean`

Signature: `clean(value: string, exception = ''): string`

By default, `clean` strips out all characters _except_ numbers, _and_ trims the
string to nine characters.

```javascript
import { clean } from "parse-ssn";

clean("123-12-1234") // => 123121234
clean(" 123 12-1234") // => 123121234
clean("123-12-1234-12345") // => 123121234
```

To clean a string that may be masked, pass exceptions.

```javascript
import { clean } from "parse-ssn";

clean("*****1234", "*") // => *****1234
```

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
