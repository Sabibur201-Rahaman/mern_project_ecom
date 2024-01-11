import React from 'react'
import footer from './Footer.jsx'
import appNavbar from './AppNavbar.jsx'
function LayOut(props) {
  return (
    <div>
      {/* <appNavbar/> */}
    {props.children}
    <footer/>
    </div>
  )
}

export default LayOut
