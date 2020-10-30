export function clean (value: string, exception = ''): string {
  const reg = new RegExp(`[^${exception}\\d]*`, 'g')

  return value
    .trim()
    .replace(reg, '')
    .slice(0, 9)
}

export function format (
  value: string,
  separator = '-',
  existingPlaceholder = '*'
): string {
  const s = clean(value, existingPlaceholder).split('')

  return [0, 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10]
    .reduce((p, fake, i) => {
      if (!s.length) return p
      return p.concat(i === 3 || i === 6 ? separator : s.shift() || ' ')
    }, [])
    .join('')
    .trim()
}

export function mask (value: string, placeholder = '*'): string {
  return clean(value, placeholder)
    .split('')
    .map((c, i, s) => {
      return i < 5 ? (i === s.length - 1 ? c : placeholder) : c
    })
    .join('')
}

export function validate (value: string, exception = '-'): boolean {
  return new RegExp(
    `^(?!666|000|9\\d{2})\\d{3}${exception}{0,1}(?!00)\\d{2}${exception}{0,1}(?!0{4})\\d{4}$`
  ).test(value)
}
