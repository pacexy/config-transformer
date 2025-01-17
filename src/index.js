/**
 * @typedef {{ rules: Rules }} Config
 * @typedef {{ [x: string]: any }} Rules
 */

/**
 * @param {Rules} rules
 * @param {{ [x: string]: any }} data
 */
export function transform(rules, data) {
  /** @type {{ [x: string]: any }} */
  const files = {}

  for (const [file, value] of Object.entries(rules)) {
    // getFileContent
    if (typeof value === 'function') {
      files[file] = value()
      // sub-rules
    } else if (typeof value === 'object') {
      files[file] = transform(value, {})
    } else {
      throw new TypeError('Invalid rule')
    }
    delete data[file]
  }

  if (Object.keys(data).length > 0) {
    files['base.json'] = data
  }

  return files
}
