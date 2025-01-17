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
 * @param {any} content
 */
export function file(content) {
  return {
    __content__: content,
  }
}

/**
 * @param {any} value
 */
export function isFile(value) {
  return typeof value === 'object' && '__content__' in value
}
