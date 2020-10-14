# parse-ssn ![npm](https://img.shields.io/npm/v/parse-ssn) [![](https://badgen.net/bundlephobia/minzip/parse-ssn)](https://bundlephobia.com/result?p=parse-ssn)

Tiny toolkit to format, mask, and validate US Social Security numbers.

```bash
npm i parse-ssn
```

## Usage

#### `mask(value: string[, placeholder = '*']): string`

```javascript
import { mask } from 'parse-ssn'

mask('123121234') // => *****1234
mask('123121234', '#') // => #####1234
```

#### `format(value: string[, separator = '-', existingPlaceholder = '*']): string`

```javascript
import { format } from 'parse-ssn'

format('123121234') // => 123-12-1234
format('123121234', ' ') // => 123 12 1234
```

Compose methods for additional flexibility:

```javascript
import { format, mask } from 'parse-ssn'

const masked = mask('123121234') // => *****1234
const formatted = format(masked) // => ***-**-1234
```

When dealing with formatting of masks that use a placeholder other than `*`, you
need to pass additional information about the format.

```javascript
import { format } from 'parse-ssn'

format('#####1234', '-', '#') // => ###-##-1234
```

#### `validate(value: string): boolean`

Validation is based on information gathered from the [Social Security
Administration's website](https://www.ssa.gov/employer/stateweb.htm). If an edge
case is missing, please open an issue.

```javascript
import { validate } from 'parse-ssn'

validate('123121234') // => true
```

#### `clean(value: string, exception = ''): string`

By default, `clean` strips out all characters _except_ numbers, _and_ trims the
string to nine characters.

```javascript
import { clean } from 'parse-ssn'

clean('123-12-1234') // => 123121234
clean(' 123 12-1234') // => 123121234
clean('123-12-1234-12345') // => 123121234
```

To clean a string that may be masked, pass an exception.

```javascript
import { clean } from 'parse-ssn'

clean('*****1234', '*') // => *****1234
```

### License

MIT License © [Truework](https://www.truework.com)
