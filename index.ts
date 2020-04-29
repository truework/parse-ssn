export function clean(value: string, exception = ""): string {
  const reg = new RegExp(`[^${exception}\\d]*`, "g");

  return value
    .trim()
    .replace(reg, "")
    .slice(0, 9);
}

export function format(
  value: string,
  separator = "-",
  existingPlaceholder = "*"
): string {
  const s = clean(value, existingPlaceholder);

  return [0, 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10]
    .reduce((p, fake, i) => {
      return p.concat(i === 3 || i === 6 ? separator : s[fake] ? s[fake] : " ");
    }, [])
    .join("")
    .trim();
}

export function mask(value: string, placeholder = "*"): string {
  return clean(value)
    .split("")
    .map((c, i, s) => {
      return i < 5 ? (i === s.length - 1 ? c : placeholder) : c;
    })
    .join("");
}

export function validate(value: string): boolean {
  return /^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/.test(value);
}
