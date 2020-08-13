import { useRef } from 'react'

export const cannotFalsy = (name, value) => {
  if (!value) {
    throw new Error(`${name} returns falsy, please specify a correct ${name} `)
  }
}

export const cannotRedef = value => {
  return useRef(value).current
}
