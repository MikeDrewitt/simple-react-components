import React from 'react'

import { SearchableDropdown } from 'simple-react-components'

import './main.css'

const Main = () => {
  const createOptions = () => {
    const response = []

    for (let i = 0; i < 100; i++) {
      response.push({ label: `Number - ${i}`, value: i })
    }

    return response
  }

  const options = createOptions()

  const handleChange = (value: any) => console.log(value)

  return (
    <div style={{ padding: 20 }}>
      <SearchableDropdown
        label='Super awesome searchable dropdown'
        placeholder='Select Option'
        options={options}
        onChange={handleChange}
      />
    </div>
  )
}

export default Main
