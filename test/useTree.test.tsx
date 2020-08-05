import React from 'react'
import useTree from '../src/'
import type { TreeConfig } from '../src/'
import { render } from '@testing-library/react'

const test = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        {
          id: 3,
          children: []
        }
      ]
    }
  ]
}

function setup(source: any, config?: TreeConfig): any[] {
  let returnVal: any = []
  function TestComponent() {
    returnVal = useTree(source, config)
    return null
  }
  render(<TestComponent />)
  return returnVal
}

describe('Flattens', () => {
  it('Flattens', () => {
    expect(setup(test)).toHaveLength(3)
  })
})
