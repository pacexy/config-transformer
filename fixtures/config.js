import { consume } from '../src/utils.js'

/** @type {import('../src/index.js').Config} */
export default {
  rules: {
    'manifest.json': (s) => consume(s, 'manifest'),
    profiles: (s) =>
      consume(s, 'profiles').map((/** @type {{ [x: string]: any; }} */ p) => ({
        [p.name]: {
          'template.html': consume(p, 'template'),
        },
      })),
  },
}
