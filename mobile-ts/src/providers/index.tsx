import React, { useMemo } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ThemeProvider } from '@shopify/restyle'

import { useThemeStore } from '@/common/stores'
import { darkTheme, lightTheme } from '@/common/themes'
import { ErrorBoundary } from '@/modules/error/components'
import { AppRoutes } from '@/routes'

export const AppProviders: React.FC = function () {
  const isDarkMode = useThemeStore(state => state.isDarkMode)
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <RootSiblingParent>
        <SafeAreaProvider>
          <ErrorBoundary catchErrors="dev">
            <AppRoutes />
          </ErrorBoundary>
        </SafeAreaProvider>
      </RootSiblingParent>
    </ThemeProvider>
  )
}
