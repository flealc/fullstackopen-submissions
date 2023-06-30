import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetField = () => {
    setValue('')
  }

  const fields = () => {
    
    return {
      name,
      value,
      onChange
    }
  }
  return {
    resetField,
    fields
  }
}
