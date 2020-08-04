import React, { ChangeEvent } from 'react'

import shortid from 'shortid'

import { DropdownObject } from '../dropdown.types'

import styles from './styles.css'

type Props = {
  options: Array<DropdownObject>
  onChange: (value: any) => void

  startUndefined?: boolean // Forces loading the dropdown unselected (no text shown)
  placeholder?: string // Used in the even of wanting to start the dropdown unselected
  label?: string // Lable for the dropdown
  defaultValue: any
  id?: string // HTML id - gets set to a guid if left unset
  className?: string // Overwrites the existing css
}

type State = {
  localValue: any // Used to maintain the local state of the dropdown
  placeholderValue: string // Used to select the placeholder in the event that it's required
}

class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    id: `_generated__id__${shortid.generate()}`,
    defaultValue: undefined,
    startUndefined: false,
    placeholder: ''
  }

  constructor(props: Props) {
    super(props)

    const unsetDefaultValue = props.startUndefined || props.placeholder

    this.state = {
      localValue: props.defaultValue,
      placeholderValue: unsetDefaultValue ? shortid.generate() : ''
    }
  }

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ localValue: e.target.value, placeholderValue: '' })
    this.props.onChange(e.target.value)
  }

  render() {
    const { localValue, placeholderValue } = this.state
    const {
      options,
      startUndefined,
      placeholder,
      label,
      id,
      className
    } = this.props

    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label htmlFor={id}>{label}</label>}
        <select
          id={id}
          onChange={this.handleChange}
          value={placeholderValue || localValue}
        >
          {(startUndefined || placeholder) && (
            <option disabled value={placeholderValue}>
              {placeholder}
            </option>
          )}

          {options.map((option, index) => {
            const { value, label } = option

            return (
              <option key={index} value={value}>
                {label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default Dropdown
