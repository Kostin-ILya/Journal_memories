import { useForm } from 'react-hook-form'
import { IoTrashOutline } from 'react-icons/io5'

import axios from 'axios'
import clsx from 'clsx'

import calendarIcon from '../../assets/calendar.svg'
import folderIcon from '../../assets/folder.svg'

import cl from './MemoryForm.module.scss'

const API_BASE = 'https://65b0346f2f26c3f2139c9e06.mockapi.io/records'
const handleError = (err) => {
  console.log(err)
  alert('Ошибка отправки запроса на сервер. Пожалуйста, повторите')
}

const MemoryForm = ({ addMemory, selectedMemory, handleDelete }) => {
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
      .post(API_BASE, newMemory)
      .then((res) => {
        addMemory((prevState) => [
          ...prevState,
          { ...newMemory, id: res.data.id },
        ])
        reset()
      })
      .catch((e) => {
        handleError(e)
      })
  }

  const onDelete = () => {
    if (selectedMemory) {
      handleDelete(selectedMemory.id)

      axios
        .delete(`${API_BASE}/${selectedMemory.id}`)
        .catch((e) => handleError(e))
    } else {
      reset()
    }
  }

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.titleWrapper}>
        <input
          className={clsx(cl.title, { [cl.error]: errors.title })}
          type="text"
          placeholder="Заголовок"
          {...register('title', {
            required: true,
          })}
        />

        <IoTrashOutline className={cl.iconTrash} onClick={onDelete} />
      </div>

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
