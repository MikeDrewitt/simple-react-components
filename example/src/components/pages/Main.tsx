import React from 'react'

import { Dropdown } from 'simple-react-components'

import './main.css'

const Main = () => {
  const handleChange = (value: any) => console.log(value)
  const options = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' }
  ]

  return (
    <div style={{ padding: 20 }}>
      <Dropdown
        label='Number Picker'
        placeholder='Select an option'
        options={options}
        onChange={handleChange}
      />
    </div>
  )
}

export default Main
