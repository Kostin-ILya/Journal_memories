import { useState, useEffect } from 'react'

import axios from 'axios'

import CreateMemoryBtn from './components/CreateMemoryBtn/CreateMemoryBtn'
import MemoryForm from './components/MemoryForm/MemoryForm'
import MemoryList from './components/MemoryList/MemoryList'
import Header from './layouts/LeftPanel/Header'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import MainPanel from './layouts/MainPanel/MainPanel'

import './App.css'
import { Memory } from './interfaces'

axios.defaults.baseURL = 'https://65b0346f2f26c3f2139c9e06.mockapi.io/records'

function App() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    axios
      .get('')
      .then((res) => setMemories(res.data))
      .catch((e) => {
        console.log(e)
        setFetchError(true)
      })
  }, [])

  const handleDelete = (id: string) => {
    setMemories((prevState) => prevState.filter((mem) => mem.id !== id))
    setSelectedMemory(null)
  }

  const handleSelectMemory = (id: string) => {
    setSelectedMemory(memories.find((it) => it.id === id)!)
  }

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
          <MemoryList list={memories} onSelectMemory={handleSelectMemory} />
        ) : !fetchError ? (
          <p>Загрузка данных...</p>
        ) : (
          <p style={{ color: 'red' }}>
            Ошибка загрузки данных, попробуйте обновить страницу
          </p>
        )}
      </LeftPanel>

      <MainPanel>
        <MemoryForm
          addMemory={setMemories}
          selectedMemory={selectedMemory}
          setSelectedMemory={setSelectedMemory}
          handleDelete={handleDelete}
        />
      </MainPanel>
    </>
  )
}

export default App
