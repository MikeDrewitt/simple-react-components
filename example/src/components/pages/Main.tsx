import React from 'react'

import { TextField } from 'simple-react-components'

import './main.css'

const Main = () => {
  const handleChange = () => console.log('Changed')
  //   const handleClick = () => console.log('Clicked')

  return (
    <div style={{ padding: 20 }}>
      <TextField
        className='area'
        onChange={handleChange}
        label='Example Input'
        sublabel='Helpful tooltip'
        placeholder='Enter Data'
      />
      {/* <Button onClick={handleClick}>Click Me</Button> */}
    </div>
  )
}

export default Main
