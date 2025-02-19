import { Input } from '@/Components/ui/input'
import { useState } from 'react'

export default function NameInput({ value = '', onChange, ...props }) {
  const [internalValue, setInternalValue] = useState(value)

  const handleChange = (e) => {
    let newValue = e.target.value
    newValue = newValue.toLowerCase().replace(/(?:^|\s)\S/g, (match) => match.toUpperCase())

    setInternalValue(newValue)

    if (onChange) {
      onChange({ ...e, target: { ...e.target, value: newValue } })
    }
  }

  return <Input type="text" value={internalValue} onChange={handleChange} {...props} />
}
