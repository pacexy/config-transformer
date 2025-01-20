import path from 'node:path/posix'
import { isFile } from './utils.js'

/**
 * @typedef {{ rules: Rules }} Config
 * @typedef {{ [x: string]: any }} Rules
 */

/**
 * @param {Rules} rules
 * @param {string} baseUrl
 * @param {{ [x: string]: any }} files
 */
export function transform(rules, baseUrl = '', files = {}) {
  for (const [file, value] of Object.entries(rules)) {
    const url = path.join(baseUrl, file)

    if (isFile(file)) {
      files[url] = value
    } else {
      transform(value, url, files)
    }
  }

  return files
}
