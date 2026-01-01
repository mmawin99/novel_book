'use client'

import { useMounted } from 'use100hooks'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggleButton() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE
  })
  const isMounted = useMounted()

  if (isMounted) 
    return (
      <button
        ref={ref}
        onClick={toggleSwitchTheme}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
      >
        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    )

  return null
}