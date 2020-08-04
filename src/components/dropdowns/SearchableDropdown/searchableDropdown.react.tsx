import React from 'react'

import shortid from 'shortid'

import { AdvancedDropdownObject } from '../dropdown.types'
import Keys from '../../../constants/keycodes.const'

import styles from './styles.css'

type Props = {
  // Options for the dropdown
  options: Array<AdvancedDropdownObject>
  // Callback function for when an option is selected
  onChange: (value: any) => void

  // User facing dropdown description
  label?: string
  // Placeholder text for the search field
  placeholder?: string
  // HTML id of the search input (used for label selection)
  id?: string
  // Passthrough CSS className to parent
  className?: string
  // Optional component to render when no searched for results are found
  noOptions?: React.ReactNode
}

type State = {
  // Whether or not the dropdown is open
  isOpen: boolean
  // Value of the dropdown
  inputValue: string
  // Smaller list of dropdown items filtered to the inputs value
  filteredOptions: Array<AdvancedDropdownObject>
  // Highlighted item in the filtered options - highlighted by the arrow keys
  featuredIndex: number | null
}

class SearchableDropown extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>

  static defaultProps = {
    id: `_generated__id__${shortid.generate()}`
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isOpen: true,
      inputValue: '',
      filteredOptions: props.options,
      featuredIndex: null
    }

    this.inputRef = React.createRef()

    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const keyCode = e.keyCode
    const { isOpen, featuredIndex, filteredOptions } = this.state
    const maxIndex = filteredOptions.length - 1

    let newIndex = featuredIndex

    if (!isOpen) return
    if (keyCode === Keys.Esc) return this.handleClose()

    if (featuredIndex !== null) {
      const option = filteredOptions[featuredIndex]
      const indexUp = featuredIndex > 0 ? featuredIndex - 1 : featuredIndex
      const indexDown =
        featuredIndex === maxIndex ? featuredIndex : featuredIndex + 1

      if (keyCode === Keys.Enter) this.handleSelectOption(option)
      else if (keyCode === Keys.Up) newIndex = indexUp
      else if (keyCode === Keys.Down) newIndex = indexDown
    } else {
      if (keyCode === Keys.Down) newIndex = 0
      else if (keyCode === Keys.Up) newIndex = maxIndex
    }

    this.setState({ featuredIndex: newIndex })

    const scrollRef = this['_refs-' + newIndex]

    if (!scrollRef) return

    scrollRef.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }

  handleOpen = () => this.setState({ isOpen: true, featuredIndex: null })

  handleClose = () => {
    const { options } = this.props

    this.setState({
      filteredOptions: options,
      featuredIndex: null,
      isOpen: false
    })

    this.inputRef.current?.blur()
  }

  handleAssignRef = (ref: HTMLDivElement, index: number) => {
    this['_refs-' + index] = ref
  }

  handleTextUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const { options } = this.props

    const filteredOptions = options.filter((option) => {
      return option.label.toLowerCase().includes(inputValue.toLowerCase())
    })

    this.setState({ inputValue, filteredOptions })
  }

  handleSelectOption = (option: AdvancedDropdownObject) => {
    const { onChange } = this.props

    onChange(option.value)

    this.setState({ inputValue: option.value })
    this.handleClose()
  }

  renderOptions = () => {
    const { noOptions } = this.props
    const { featuredIndex, filteredOptions } = this.state

    const label = (content: string) => (
      <label className={`${styles['option-label']} option-label`}>
        {content}
      </label>
    )

    if (!filteredOptions.length && noOptions) return noOptions
    if (!filteredOptions.length) return label('No options found')

    return filteredOptions.map((option, index) => (
      <div
        className={`${styles.option} ${
          index === featuredIndex ? styles.highlighted : ''
        } option}`}
        key={index}
        ref={(ref: HTMLDivElement) => this.handleAssignRef(ref, index)}
        onClick={() => this.handleSelectOption(option)}
      >
        {option.component ? option.component : label(option.label)}
      </div>
    ))
  }

  render() {
    const { label, placeholder, id, className } = this.props
    const { isOpen, inputValue } = this.state

    return (
      <div className={`${styles.parent} ${className}`}>
        {label && (
          <label className={`${styles.label} label`} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type='text'
          id={id}
          value={inputValue}
          ref={this.inputRef}
          placeholder={placeholder}
          onFocus={this.handleOpen}
          onChange={this.handleTextUpdate}
        />
        {isOpen && (
          <React.Fragment>
            <div
              className={`${styles.close} close`}
              onClick={this.handleClose}
            />
            <div className={`${styles.options} options`}>
              {this.renderOptions()}
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default SearchableDropown
