/**
 * @typedef {{ rules: Rules }} Config
 * @typedef {{ [x: string]: any }} Rules
 */

/**
 * @param {Rules} rules
 */
export function transform(rules) {
  /** @type {{ [x: string]: any }} */
  const files = {}

  for (const [file, value] of Object.entries(rules)) {
    if (typeof value === 'object') {
      files[file] = value.__content__ ?? transform(value)
    } else {
      throw new TypeError('Invalid rule')
    }
  }

  return files
}
