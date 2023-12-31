import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <h2>hello this is frontend development</h2>
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<HomePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
