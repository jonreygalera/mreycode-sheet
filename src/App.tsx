import { useState } from 'react'
import './App.css';
import Workspace from './components/Workspace/Workspace';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Workspace
          
        />
       </div>
    </>
  )
}

export default App
