import './App.scss'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from "react-router-dom"
import { Provider } from './contexts/TodoContexts'
import TodoList from './pages/TodoList'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todos/:customListName" element={
          <Provider>
            <TodoList />
          </Provider>
        } />
      </Routes>
    </>
  )
}

export default App
