import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import Button from './button.react'

describe('Button', () => {
  const expectedButtonText = 'Click me'
  const expectedOnClick = jest.fn()

  it('Renders component children', () => {
    render(<Button onClick={expectedOnClick}>{expectedButtonText}</Button>)

    try {
      screen.getByText(expectedButtonText)
    } catch (err) {
      expect(false).toBeTruthy()
    }
  })

  it('`onClick` is called', () => {
    render(<Button onClick={expectedOnClick}>{expectedButtonText}</Button>)

    fireEvent.click(screen.getByText(expectedButtonText))

    expect(expectedOnClick).toHaveBeenCalled()
  })

  it('`className` is last class applied to component', () => {
    const expectedClassName = 'example-class-name'

    const { container } = render(
      <Button className={expectedClassName} onClick={expectedOnClick}>
        {expectedButtonText}
      </Button>
    )

    expect(container.firstChild).toHaveClass(expectedClassName)
  })
})
