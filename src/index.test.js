import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { transform } from './index.js'

describe('index', async () => {
  const fixtures = path.join(import.meta.dirname, '../fixtures')
  const config = await import(path.join(fixtures, 'config.js'))
  const input = readFileSync(path.join(fixtures, 'input.json'), 'utf8')
  const data = JSON.parse(input)

  it('create config', async () => {
    await expect(config.default(data)).toMatchFileSnapshot(
      path.join(fixtures, 'config.json'),
    )
  })

  it('transform', async () => {
    await expect(transform(config.default, data)).toMatchFileSnapshot(
      path.join(fixtures, 'output.json'),
    )
  })
})
