/**
 * @typedef {{ rules: Rules }} Config
 * @typedef {{ [x: string]: any }} Rules
 */

import path from 'node:path/posix'

/**
 * @param {Rules} rules
 * @param {string} baseUrl
 * @param {{ [x: string]: any }} files
 */
export function transform(rules, baseUrl = '', files = {}) {
  for (const [file, value] of Object.entries(rules)) {
    const url = path.join(baseUrl, file)
    if (typeof value === 'object') {
      if (value.__content__) {
        files[url] = value.__content__
      } else {
        transform(value, url, files)
      }
    } else {
      throw new TypeError('Invalid rule')
    }
  }

  return files
}
