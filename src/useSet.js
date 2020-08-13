import { useState, useCallback } from 'react'
import { cannotRedef } from './util'

export default (defaultNodes, { getId: getIdIn = node => node.id } = {}) => {
  const getId = cannotRedef(getIdIn)
  const [nodes, setNodes] = useState(new Set(defaultNodes.map(getId)))

  const addNode = useCallback(
    node => setNodes(new Set(nodes.add(getId(node)))),
    []
  )

  const removeNode = useCallback(
    node => {
      const newNodes = new Set(nodes)
      newNodes.delete(getId(node))
      setNodes(new Set(newNodes))
    },
    [nodes]
  )

  const clear = useCallback(() => setNodes(new Set()), [])

  return [nodes, addNode, removeNode, clear]
}
