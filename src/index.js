/**
 * @typedef {{ rules: Rules }} Config
 * @typedef {{ [x: string]: any }} Rules
 */

/**
 * @param {(data: { [x: string]: any }) => Config} createConfig
 * @param {{ [x: string]: any }} data
 */
export function transform(createConfig, data) {
  const { rules } = createConfig(data)

  /** @type {{ [x: string]: any }} */
  const files = {}

  for (const [file, value] of Object.entries(rules)) {
    if (typeof value === 'function') {
      files[file] = value(data)
    } else if (Array.isArray(value)) {
      files[file] = value.map((v) => transform(() => ({ rules: v }), {}))
    } else {
      files[file] = transform(() => ({ rules: value }), {})
    }
    delete data[file]
  }

  if (Object.keys(data).length > 0) {
    files['base.json'] = data
  }

  return files
}
