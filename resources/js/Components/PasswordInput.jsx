import { useState, forwardRef } from 'react'
import { Button } from '@/Components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

export const PasswordInput = forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    if (ref?.current) {
      ref.current.type = showPassword ? 'password' : 'text'
    }
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="relative rounded-md">
      <input
        ref={ref}
        type="password"
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
        {...props}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </Button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'
