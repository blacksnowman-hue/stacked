import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { themes } from '../features/themes';
import { LocalStorageKeys } from '../shared/LocalStorageKeys';

// undefined is OK, context does not have to have a defaultValue.
const ThemeContext = createContext(undefined);

export function ThemeInitializer({ children }) {
  const defaultTheme = themes[0];

  const [themeName, setThemeName] = useLocalStorage(
    LocalStorageKeys.Theme,
    defaultTheme.name,
  );

  return (
    <ThemeContext.Provider
      value={{
        theme: themes.find((theme) => theme.name === themeName) ?? defaultTheme,
        setThemeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 