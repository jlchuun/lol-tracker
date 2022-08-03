import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const App = () => {
  
  const searchUser = () => {

  }

  return (
    <div>
      <form>
        <input onSubmit={searchUser} />
      </form>
      <Outlet />
    </div>
  )
}

export default App