import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { transform } from './index.js'

describe('index', () => {
  it('transform', async () => {
    const fixtures = path.join(import.meta.dirname, '../fixtures')
    const config = await import(path.join(fixtures, 'config.js'))
    const input = readFileSync(path.join(fixtures, 'input.json'), 'utf8')

    await expect(transform(config.default, input)).toMatchFileSnapshot(
      path.join(fixtures, 'output.json'),
    )
  })
})
