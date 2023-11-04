import { createEvent, createStore } from 'effector'

// Types
export type Theme = 'light' | 'dark'

// Stores
export const THEME_LOCAL_STORAGE_KEY = 'theme'

const initialTheme = (localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme)
  ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export const $theme = createStore<Theme>(initialTheme)

// Events
export const toggleThemeEvent = createEvent('toggleThemeEvent')
export const setThemeEvent = createEvent<Theme>('setThemeEvent')

// Subscriptions
$theme
  .on(toggleThemeEvent, previousTheme => (previousTheme === 'light' ? 'dark' : 'light'))
  .on(setThemeEvent, (_, theme) => theme)

$theme.watch(theme => {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme)

  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
