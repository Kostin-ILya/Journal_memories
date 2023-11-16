import MemoryListItem from './MemoryListItem/MemoryListItem'

import cl from './MemoryList.module.scss'
import { Memory } from '../../interfaces'

interface MemoryListProps {
  memories: Memory[]
  onSelectMemory: (id: string) => void
}

const sortFn = (a: Memory, b: Memory) => {
  if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
    return 1
  } else {
    return -1
  }
}

const MemoryList = ({ memories, onSelectMemory }: MemoryListProps) => {
  return (
    <div className={cl.memoriesList}>
      {memories.length ? (
        memories
          .sort(sortFn)
          .map((item) => (
            <MemoryListItem
              key={item.id}
              handleClick={onSelectMemory}
              {...item}
            />
          ))
      ) : (
        <p>Воспоминаний пока нет, добавьте первое</p>
      )}
    </div>
  )
}

export default MemoryList
