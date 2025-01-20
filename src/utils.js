/**
 * @param {{ [x: string]: any; }} object
 * @param {string} property
 */
export function consume(object, property) {
  const value = object[property]
  delete object[property]
  return value
}

/**
 * @param {string} filename
 */
export function detectFileForm(filename) {
  return filename.includes('.') ? 'file' : 'directory'
}
