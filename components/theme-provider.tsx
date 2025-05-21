"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export interface ThemeOptions {
  theme: string
  fontScale: number
}

interface ThemeContextType {
  themeOptions: ThemeOptions
  setThemeOptions: React.Dispatch<React.SetStateAction<ThemeOptions>>
}

export const ThemeContext = React.createContext<ThemeContextType>({
  themeOptions: { theme: "default", fontScale: 1 },
  setThemeOptions: () => null,
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [themeOptions, setThemeOptions] = React.useState<ThemeOptions>({
    theme: "default",
    fontScale: 1,
  })

  return (
    <ThemeContext.Provider value={{ themeOptions, setThemeOptions }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => React.useContext(ThemeContext)

