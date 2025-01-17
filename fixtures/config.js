import { consume, file } from '../src/utils.js'

/**
 * @param {{ [x: string]: any }} data
 */
export default function createConfig(data) {
  return {
    rules: {
      'base.json': file(data),
      'manifest.json': file(consume(data, 'manifest')),
      // @ts-ignore
      // eslint-disable-next-line unicorn/no-array-reduce, unicorn/prevent-abbreviations
      profiles: consume(data, 'profiles').reduce((acc, p) => {
        acc[p.name] = {
          'base.json': file(p),
          'template.html': file(consume(p, 'template')),
        }
        return acc
      }, {}),
    },
  }
}
