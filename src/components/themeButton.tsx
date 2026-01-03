'use client'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'
import { Moon, Sun } from 'lucide-react'
import { useIsClient } from 'usehooks-ts'
import { useTheme } from 'next-themes'

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()

  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 500
  })
  const isClient = useIsClient();
  const isDarkMode = resolvedTheme === 'dark'
  const themeSwitcher = () => {
    toggleSwitchTheme()
    setTimeout(()=>{
      setTheme(isDarkMode ? 'light' : 'dark')
    }, 300);
  }
  if (isClient) 
    return button({ref, onClick: themeSwitcher, isDarkMode})
  else
    return button({ref, onClick: themeSwitcher, isDarkMode: false})
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