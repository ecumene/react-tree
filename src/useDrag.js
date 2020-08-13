import { useState } from 'react'

export default (nodes, dragging) => {
  const [isDragging, setDragging] = useState()
  const dragNodes = useMemo((node) => toDraggableNode({...node, }))
  return { isDragging, setDragging, dragNodes }
}

export const useDrag() => {
  const bind = useGesture();
  return bind;
}
