import MemoryListItem from './MemoryListItem/MemoryListItem'

import cl from './MemoryList.module.scss'

const sortFn = (a, b) => {
  if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
    return 1
  } else {
    return -1
  }
}

const MemoryList = ({ memories }) => {
  return (
    <div className={cl.memoriesList}>
      {memories.length ? (
        memories
          .sort(sortFn)
          .map((item) => <MemoryListItem key={item.id} {...item} />)
      ) : (
        <p>Воспоминаний пока нет, добавьте первое</p>
      )}
    </div>
  )
}

export default MemoryList
