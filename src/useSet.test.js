import useSet from './useSet'
import { describe, it, expect } from '@jest/globals'
import { act, renderHook } from '@testing-library/react-hooks'

const defaultSet = [{ id: 1 }, { id: 2 }, { id: 3 }]

describe('use tree', () => {
  it('entries are unique', () => {
    const { result } = renderHook(() => useSet([...defaultSet, defaultSet[0]]))
    expect(result.current[0].size).toBe(3)
  })
  it('can add entry', () => {
    const { result } = renderHook(() => useSet(defaultSet))
    act(() => result.current[1]({ id: 4 }))
    expect(result.current[0].size).toBe(4)
  })
  it('can remove entry', () => {
    const { result } = renderHook(() => useSet(defaultSet))
    act(() => result.current[2]({ id: 3 }))
    expect(result.current[0].size).toBe(2)
  })
})
