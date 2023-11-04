/* eslint-disable no-console */
import { createEffect } from 'effector'

// Derived stores
export const debugLogFx = createEffect((input: unknown) => {
  console.log('\x1b[42m%s\x1b[0m', '<debug>')
  console.log(input)
  console.log('\x1b[42m%s\x1b[0m', '</debug>')
})
