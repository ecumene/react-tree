import useTree from '../'
import { renderHook } from '@testing-library/react-hooks'

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

const testWithOtherChildren = {
  id: 1,
  kids: [
    {
      id: 2,
      kids: [
        {
          id: 3,
          kids: []
        }
      ]
    }
  ]
}

describe('use tree', () => {
  it('flattens source', () => {
    const {
      result: { current: flattened }
    } = renderHook(() => useTree(test, {}))
    expect(flattened).toHaveLength(3)
  })
  it('alternative id still flattens fine', () => {
    const {
      result: { current: flattened }
    } = renderHook(() =>
      useTree(testWithOtherChildren, {
        flattenCallback: node => node.kids.length,
        getChildren: node => node.kids
      })
    )
    expect(flattened).toHaveLength(3)
  })
})
