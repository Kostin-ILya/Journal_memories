import { useState, useEffect } from 'react'

import axios from 'axios'

import CreateMemoryBtn from './components/CreateMemoryBtn/CreateMemoryBtn'
import MemoryForm from './components/MemoryForm/MemoryForm'
import MemoryList from './components/MemoryList/MemoryList'
import Header from './layouts/LeftPanel/Header'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import MainPanel from './layouts/MainPanel/MainPanel'

import './App.css'

const date = [
  {
    id: '0',
    title: 'Подготовка к обновлению курсов',
    text: 'Горные походы открывают удивительные природные ландшафт Горные походы открывают удивительные природные ландшафт',
    date: '31.12.2023',
  },
  {
    id: '1',
    title: 'Поход в годы',
    text: 'Думал, что очень много времени Думал, что очень много времени Думал, что очень много времени',
    date: '12.01.2024',
  },
]

function App() {
  const [memories, setMemories] = useState(null)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    axios
      .get('https://65b0346f2f26c3f2139c9e06.mockapi.io/records')
      .then((res) => setMemories(res.data))
      .catch((e) => {
        console.log(e)
        setFetchError(true)
      })
  }, [])

  return (
    <>
      <LeftPanel>
        <Header />
        <CreateMemoryBtn />

        {memories ? (
          <MemoryList memories={memories} />
        ) : !fetchError ? (
          <p>Загрузка данных...</p>
        ) : (
          <p style={{ color: 'red' }}>
            Ошибка загрузки данных, попробуйте обновить страницу
          </p>
        )}
      </LeftPanel>

      <MainPanel>
        <MemoryForm addMemory={setMemories} />
      </MainPanel>
    </>
  )
}

export default App
