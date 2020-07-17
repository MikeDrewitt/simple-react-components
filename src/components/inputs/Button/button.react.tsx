import React from 'react'

import styles from './styles.css'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
}

class Button extends React.Component<Props> {
  static defaultProps = { type: 'button' }

  render() {
    const { onClick, className, children, type } = this.props

    return (
      <button
        className={`${styles.button} ${className}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    )
  }
}
export default Button
