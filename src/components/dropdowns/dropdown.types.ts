/**
 * Simple dropdown option type
 */
export interface DropdownObject {
  /**
   * Direct implementation is situational, but the value is the likely thing being returned
   * when the dropdown is selected.
   */
  value: any

  /**
   * The text that's being displayed to the user in the dropdown while open.
   * Shoud also be used to filter on for filterable dropdowns (as that's what the user sees by default)
   */
  label: string
}

/**
 * Extended dropdown object that is used for any dropdown that isn't a simple HTML dropdown
 */
export interface AdvancedDropdownObject extends DropdownObject {
  /**
   * Optional component that renders in place of the label for certain dropdowns
   */
  component?: React.ReactNode
}
