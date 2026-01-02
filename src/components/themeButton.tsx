'use client'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'
import { Moon, Sun } from 'lucide-react'
import { useIsClient } from 'usehooks-ts'

export function ThemeToggleButton() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE
  })
  const isClient = useIsClient();

  if (isClient) 
    return button({ref, onClick: toggleSwitchTheme, isDarkMode})
  else
    return button({ref, onClick: toggleSwitchTheme, isDarkMode: false})
}

function button( {ref, onClick, isDarkMode}: {ref: React.Ref<HTMLButtonElement>, onClick: () => void, isDarkMode: boolean} ) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
    >
      {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}