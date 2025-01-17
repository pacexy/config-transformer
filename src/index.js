/**
 * @typedef {{ rules: Rules }} Config
 * @typedef {{ [x: string]: (s: any) => any }} Rules
 */

/**
 * @param {Config} config
 * @param {string} input
 */
export function transform(config, input) {
  const { rules } = config
  const data = JSON.parse(input)

  /** @type {{ [x: string]: any }} */
  const files = {}

  for (const [file, getFileContent] of Object.entries(rules)) {
    const fileContent = getFileContent(data)
    files[file] = fileContent
  }
  files['base.json'] = data

  return files
}
