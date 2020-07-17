import React from 'react'

import shortid from 'shortid'

import './styles.css'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  id?: string
  type: 'text' | 'email'
  label?: string
  sublabel?: string
  placeholder?: string
}

class TextField extends React.Component<Props> {
  static defaultProps = {
    id: `_generated__id__${shortid.generate()}`,
    type: 'text'
  }

  render() {
    const {
      onChange,
      className,
      id,
      type,
      label,
      sublabel,
      placeholder
    } = this.props

    return (
      <div className={className}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
        />
        {sublabel && <label>{sublabel}</label>}
      </div>
    )
  }
}
export default TextField
