import path from 'node:path/posix'
import { detectFileForm } from './utils.js'

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
    const fileForm = detectFileForm(file)

    if (fileForm === 'file') {
      files[url] = value // value of the file is the content
    } else {
      transform(value, url, files) // value of the directory is the rules
    }
  }

  return files
}
