import React from 'react'
import HomePage from './pages/HomePage'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AppNavBar from './components/layout/AppNavbar'

function App() {
  return (
    <div>
      <h2>hello this is frontend development</h2>
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<HomePage/>}/>
        {/* <Route path="/"  element={<AppNavBar/>}/> */}
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
