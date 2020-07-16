import React from 'react'

import { Button } from 'simple-react-components'

import './main.css'

const Main = () => {
  const handleClick = () => console.log('Clicked')

  return (
    <div style={{ padding: 20 }}>
      <Button className='button' onClick={handleClick}>
        Click Me
      </Button>
    </div>
  )
}

export default Main
