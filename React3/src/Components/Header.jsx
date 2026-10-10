import { useState } from 'react'
import ChefLogo from "../Images/ChefLogo.png"


function Header() {

  return (
    <header>
      <img src={ChefLogo} alt="Chef Logo" />
      <h1>Chef Cloude</h1>
    </header>
  )
}

export default Header