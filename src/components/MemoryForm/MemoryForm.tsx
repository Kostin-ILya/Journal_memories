import { useRef, useEffect, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { IoTrashOutline } from 'react-icons/io5'

import axios from 'axios'
import clsx from 'clsx'

import calendarIcon from '../../assets/calendar.svg'
import folderIcon from '../../assets/folder.svg'

import cl from './MemoryForm.module.scss'
import { Memory } from '../../interfaces'

interface MemoryFormProps {
  addMemory: React.Dispatch<React.SetStateAction<Memory[] | null>>
  selectedMemory: Memory | null
  handleDelete: (id: string) => void
}

const API_BASE = 'https://65b0346f2f26c3f2139c9e06.mockapi.io/records'
const handleError = (err: Error) => {
  console.log(err)
  alert('Ошибка отправки запроса на сервер. Пожалуйста, повторите')
}

const MemoryForm = ({
  addMemory,
  selectedMemory,
  handleDelete,
}: MemoryFormProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    titleRef.current && titleRef.current.focus()
  }, [selectedMemory])

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

  // Чтобы прокинуть свой ref на input из react-hook-form
  const { ref, ...rest } = register('title', { required: true })
  useImperativeHandle(ref, () => titleRef.current)

  const onSubmit = async (newMemory: Omit<Memory, 'id'>) => {
    await axios
      .post(API_BASE, newMemory)
      .then(({ data }: { data: Memory }) => {
        addMemory((prevState) => prevState && [...prevState, { ...data }])
        reset()
      })
      .catch((e: Error) => {
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
          {...rest}
          ref={titleRef}
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
