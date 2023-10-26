import { useForm } from 'react-hook-form'

import axios from 'axios'
import clsx from 'clsx'

import calendarIcon from '../../assets/calendar.svg'
import folderIcon from '../../assets/folder.svg'

import cl from './MemoryForm.module.scss'

const MemoryForm = ({ addMemory, selectedMemory }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    values: selectedMemory
      ? selectedMemory
      : { title: '', date: '', text: '', tag: '' },
  })

  const onSubmit = async (newMemory) => {
    await axios
      .post('https://65b0346f2f26c3f2139c9e06.mockapi.io/records', newMemory)
      .then(() => {
        addMemory((prevState) => [
          ...prevState,
          { ...newMemory, id: crypto.randomUUID() },
        ])
        reset()
      })
      .catch((e) => {
        console.log(e)
        alert('Ошибка отправки записи на сервер')
      })
  }

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={clsx(cl.title, { [cl.error]: errors.title })}
        type="text"
        placeholder="Заголовок"
        {...register('title', {
          required: true,
        })}
      />

      <div className={clsx(cl.container, { [cl.error]: errors.date })}>
        <label htmlFor="date">
          <img src={calendarIcon} alt="calendar" />
          <span>Дата</span>
        </label>
        <input
          className={cl.input}
          type="date"
          id="date"
          {...register('date', {
            required: true,
          })}
        />
      </div>

      <div className={clsx(cl.container, { [cl.error]: errors.tag })}>
        <label htmlFor="tag">
          <img src={folderIcon} alt="folder" />
          <span>Метки</span>
        </label>
        <input
          className={cl.input}
          id="tag"
          type="text"
          {...register('tag', {
            required: true,
          })}
        />
      </div>

      <textarea
        className={clsx(cl.textarea, { [cl['textarea-error']]: errors.text })}
        {...register('text', {
          required: true,
        })}
      />

      <button className={cl.btn} type="submit" disabled={isSubmitting}>
        Сохранить
      </button>
    </form>
  )
}

export default MemoryForm
