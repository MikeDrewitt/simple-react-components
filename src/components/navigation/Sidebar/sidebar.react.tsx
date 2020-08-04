import React from 'react'

// import styles from './styles.css'

interface Props {}

class Sidebar extends React.Component<Props> {
  static defaultProps = { type: 'button' }

  render() {
    return <div>Sidebar</div>
  }
}
export default Sidebar
