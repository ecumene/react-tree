import { useMemo, useCallback } from 'react'
import { cannotFalsy, cannotRedef } from './util'

// useTree
export default (
  source,
  {
    getId: getIdIn = node => node.id,
    getChildren: getChildrenIn = node => node.children,
    flattenCallback: flattenCallbackIn = node => node.children.length
  } = {}
) => {
  const getId = cannotRedef(getIdIn)
  const getChildren = cannotRedef(getChildrenIn)
  const flattenCallback = cannotRedef(flattenCallbackIn)
  cannotFalsy('getChildren', getChildren(source))
  cannotFalsy('getId', getId(source))

  let depth = 0

  const toFinalNode = useCallback(
    ({ value, depth = 0, id = getId(value), parent = null, source }) => {
      return { id, depth, parent, value, source }
    },
    [getId]
  )

  const reduce = useCallback(
    (getChildren, node) => {
      depth++
      return getChildren(node).reduce((accumulator, value) => {
        accumulator.push(toFinalNode({ value, depth, parent: node }))
        if (flattenCallback(value)) {
          accumulator = accumulator.concat(reduce(getChildren, value))
        }
        return accumulator
      }, [])
    },
    [depth, flattenCallback, toFinalNode]
  )

  const flattened = useMemo(
    () => [toFinalNode({ value: source }), ...reduce(getChildren, source)],
    [getChildren, reduce, source, toFinalNode]
  )

  return flattened
}
