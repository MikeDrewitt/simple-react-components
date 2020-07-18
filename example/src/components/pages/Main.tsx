import React from 'react'

import { TextField } from 'simple-react-components'

import './main.css'

const Main = () => {
  const handleChange = (value: any) => console.log(value)

  return (
    <div style={{ padding: 20 }}>
      <TextField label='Text Field' onChange={handleChange} />
    </div>
  )
}

export default Main
