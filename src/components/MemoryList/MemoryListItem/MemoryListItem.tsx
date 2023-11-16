import { Memory } from '../../../interfaces'
import cl from './MemoryListItem.module.scss'

interface MemoryListItemProps extends Memory {
  handleClick: (id: string) => void
}

const MemoryListItem = ({
  title,
  text,
  date,
  id,
  handleClick,
}: MemoryListItemProps) => {
  // const formattedDate = new Intl.DateTimeFormat('ru-RU').format(new Date(date))
  const formattedDate = new Date(date).toLocaleString().slice(0, 10)

  return (
    <div
      className={cl.memoryListItem}
      onClick={() => {
        handleClick(id)
      }}
      tabIndex={0}
    >
      <div className={cl.title}>{title}</div>
      <div className={cl.content}>
        <div className={cl.date}>{formattedDate}</div>
        <div className={cl.text}>
          {text.length > 24 ? text.slice(0, 24) + '...' : text}
        </div>
      </div>
    </div>
  )
}

export default MemoryListItem
