import * as React from 'react'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
}

class Button extends React.Component<Props> {
  static defaultProps = { type: 'button' }

  render() {
    const { onClick, children, type } = this.props

    return (
      <button onClick={onClick} type={type}>
        {children}
      </button>
    )
  }
}
export default Button
