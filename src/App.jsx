import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import TodoList from './components/TodoList'

function App() {
  const [show , setShow] = useState(true)
  return (
    <div className='App'>
        <TodoList>
        </TodoList>
      </div>
  );
}

export default App
