import MemoryListItem from './MemoryListItem/MemoryListItem'

import cl from './MemoryList.module.scss'

const MemoryList = ({ memories }) => {
  return (
    <div className={cl.memoriesList}>
      {memories.length ? (
        memories.map((item) => <MemoryListItem key={item.id} {...item} />)
      ) : (
        <p>Воспоминаний пока нет, добавьте первое</p>
      )}
    </div>
  )
}

export default MemoryList
