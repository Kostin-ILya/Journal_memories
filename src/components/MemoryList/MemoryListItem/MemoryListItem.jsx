import cl from './MemoryListItem.module.scss'

const MemoryListItem = ({ title, text, date }) => {
  return (
    <div className={cl.memoryListItem} tabIndex={0}>
      <div className={cl.title}>{title}</div>
      <div className={cl.content}>
        <div className={cl.date}>{date}</div>
        <div className={cl.text}>
          {text.length > 24 ? text.slice(0, 24) + '...' : text}
        </div>
      </div>
    </div>
  )
}

export default MemoryListItem
