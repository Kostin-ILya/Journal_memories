import './App.css'
import CreateMemoryBtn from './components/CreateMemoryBtn/CreateMemoryBtn'
import MemoryForm from './components/MemoryForm/MemoryForm'
import MemoryList from './components/MemoryList/MemoryList'
import Header from './layouts/LeftPanel/Header'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import MainPanel from './layouts/MainPanel/MainPanel'

const date = [
  {
    id: 0,
    title: 'Подготовка к обновлению курсов',
    text: 'Горные походы открывают удивительные природные ландшафт Горные походы открывают удивительные природные ландшафт',
    date: '31.12.2023',
  },
  {
    id: 1,
    title: 'Поход в годы',
    text: 'Думал, что очень много времени Думал, что очень много времени Думал, что очень много времени',
    date: '12.01.2024',
  },
]

function App() {
  return (
    <>
      <LeftPanel>
        <Header />
        <CreateMemoryBtn />
        <MemoryList memories={date} />
      </LeftPanel>

      <MainPanel>
        <MemoryForm />
      </MainPanel>
    </>
  )
}

export default App
