import './App.css'
import CreateMemoryBtn from './components/CreateMemoryBtn/CreateMemoryBtn'
import Header from './layouts/LeftPanel/Header'
import LeftPanel from './layouts/LeftPanel/LeftPanel'

function App() {
  return (
    <>
      <LeftPanel>
        <Header />
        <CreateMemoryBtn />
      </LeftPanel>
    </>
  )
}

export default App
