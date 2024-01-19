import React from 'react'
import HomePage from './pages/HomePage'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProductByBrand from './pages/ProductByBrand'
import ProductByCategory from './pages/ProductByCategory'
import ProductByKeyword from './pages/ProductByKeyword'
import ProductDetails from './pages/ProductDetails'


function App() {
  return (
    <div>
      <h2>hello this is frontend development</h2>
      <BrowserRouter>
      <Routes>
        <Route path="/"  element={<HomePage/>}/>
        <Route path="/by-brand/:id"  element={<ProductByBrand/>}/>
        <Route path="/by-category/:id"  element={<ProductByCategory/>}/>
        <Route path="/by-keyword/:keyword"  element={<ProductByKeyword/>}/>
        <Route path="/details/:id"  element={<ProductDetails/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
