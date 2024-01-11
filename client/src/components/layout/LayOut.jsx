import React from 'react'
import Footer from './Footer.jsx'
import AppNavbar from './AppNavbar.jsx'
function LayOut(props) {
  return (
    <div>
      <AppNavbar/>
    {props.children}
    <Footer/>
    </div>
  )
}

export default LayOut
