import { consume } from '../src/utils.js'

/**
 * @param {{ [x: string]: any }} data
 */
export default function createConfig(data) {
  return {
    rules: {
      'manifest.json': () => consume(data, 'manifest'),
      profiles: data.profiles.map((/** @type {{ [x: string]: any; }} */ p) => ({
        [p.name]: {
          'template.html': () => consume(p, 'template'),
        },
      })),
    },
  }
}
