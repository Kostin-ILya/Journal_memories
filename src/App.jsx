import { useState, useEffect } from 'react'

import axios from 'axios'

import CreateMemoryBtn from './components/CreateMemoryBtn/CreateMemoryBtn'
import MemoryForm from './components/MemoryForm/MemoryForm'
import MemoryList from './components/MemoryList/MemoryList'
import Header from './layouts/LeftPanel/Header'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import MainPanel from './layouts/MainPanel/MainPanel'

import './App.css'

function App() {
  const [memories, setMemories] = useState(null)
  const [selectedMemory, setSelectedMemory] = useState(null)

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
        <CreateMemoryBtn
          handleClick={() => {
            setSelectedMemory(null)
          }}
        />

        {memories ? (
          <MemoryList
            memories={memories}
            onSelectMemory={(id) => {
              setSelectedMemory(memories.find((it) => it.id === id))
            }}
          />
        ) : !fetchError ? (
          <p>Загрузка данных...</p>
        ) : (
          <p style={{ color: 'red' }}>
            Ошибка загрузки данных, попробуйте обновить страницу
          </p>
        )}
      </LeftPanel>

      <MainPanel>
        <MemoryForm addMemory={setMemories} selectedMemory={selectedMemory} />
      </MainPanel>
    </>
  )
}

export default App
