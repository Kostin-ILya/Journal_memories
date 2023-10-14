import { useForm } from 'react-hook-form'

import calendarIcon from '../../assets/calendar.svg'
import folderIcon from '../../assets/folder.svg'

import cl from './MemoryForm.module.scss'

const MemoryForm = () => {
  return (
    <form className={cl.form}>
      <input className={cl.title} type="text" />

      <div className={cl.container}>
        <label htmlFor="date">
          <img src={calendarIcon} alt="calendar" />
          <span>Дата</span>
        </label>
        <input className={cl.input} type="date" id="date" />
      </div>

      <div className={cl.container}>
        <label htmlFor="tag">
          <img src={folderIcon} alt="folder" />
          <span>Метки</span>
        </label>
        <input className={cl.input} id="tag" type="text" />
      </div>

      <textarea />

      <button className={cl.btn} type="submit">
        Сохранить
      </button>
    </form>
  )
}

export default MemoryForm
