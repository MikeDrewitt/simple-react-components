import React, { ChangeEvent } from 'react'

import shortid from 'shortid'

import styles from './styles.css'

type DropdownObject = {
  value: any
  label: string
}

type Props = {
  options: Array<DropdownObject>
  onChange: (value: any) => void

  startUndefined?: boolean
  placeholder?: string
  label?: string
  defaultValue?: any
  id?: string
  className?: string
}

type State = {
  localValue: any
  placeholderValue: string
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
