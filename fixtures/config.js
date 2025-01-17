import { consume } from '../src/utils.js'

/**
 * @param {{ [x: string]: any }} data
 */
export default function createConfig(data) {
  return {
    rules: {
      'manifest.json': () => consume(data, 'manifest'),
      // @ts-ignore
      // eslint-disable-next-line unicorn/no-array-reduce, unicorn/prevent-abbreviations
      profiles: data.profiles.reduce((acc, p) => {
        acc[p.name] = {
          'template.html': () => consume(p, 'template'),
        }
        return acc
      }, {}),
    },
  }
}
