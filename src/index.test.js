import { builtinModules } from 'node:module'
import { describe, expect, it } from 'vitest'
import { filename } from './index.js'

describe('index', () => {
  it('should return filename', () => {
    expect(filename).toMatchInlineSnapshot(`"index.js"`)
  })

  it('should return length of builtin modules', () => {
    expect(builtinModules.length).toMatchInlineSnapshot(`68`)
  })
})
