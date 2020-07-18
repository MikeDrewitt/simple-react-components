import React from 'react'

import shortid from 'shortid'

import styles from './styles.css'

type Props = {
  onChange: (e: string) => void

  type?: 'text' | 'email'
  defaultValue: string
  label?: string
  sublabel?: string
  placeholder?: string
  id?: string
  className?: string
}

type State = {
  localValue: string
}

class TextField extends React.Component<Props, State> {
  static defaultProps = {
    id: `_generated__id__${shortid.generate()}`,
    type: 'text',
    defaultValue: ''
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      localValue: props.defaultValue
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ localValue: e.target.value })
    this.props.onChange(e.target.value)
  }

  render() {
    const { localValue } = this.state
    const { type, label, sublabel, placeholder, id, className } = this.props

    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          value={localValue}
          id={id}
          type={type}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
        {sublabel && <label>{sublabel}</label>}
      </div>
    )
  }
}
export default TextField
